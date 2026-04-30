#!/bin/bash
set -e

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# QA Configuration
PROJECT_ID="kruit-dev"
REGION="us-central1"
SERVICE_NAME="kruit-website"
CONTACT_SERVICE_NAME="kruit-contact"

# Names of resume-vetting services already deployed for QA
AUTH_SERVICE_NAME="auth-service"
RESUME_VETTING_FRONTEND_SERVICE="frontend"

echo -e "${GREEN}=== Kruit Website QA Deployment ===${NC}\n"

# Set project
echo -e "${YELLOW}Setting GCP project...${NC}"
gcloud config set project ${PROJECT_ID}

# Enable required APIs
echo -e "\n${YELLOW}Enabling required APIs...${NC}"
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Ensure Artifact Registry repository exists
REPO_NAME="cloud-run-source-deploy"
REPO_LOCATION="${REGION}"
echo -e "\n${YELLOW}Checking Artifact Registry repository ${REPO_NAME} in ${REPO_LOCATION}...${NC}"
if gcloud artifacts repositories describe ${REPO_NAME} --location=${REPO_LOCATION} 2>/dev/null; then
  echo "Artifact Registry repository ${REPO_NAME} already exists."
else
  echo "Creating Artifact Registry repository ${REPO_NAME}..."
  gcloud artifacts repositories create ${REPO_NAME} \
    --repository-format=docker \
    --location=${REPO_LOCATION} \
    --description="Repository for Cloud Run source deploys"
fi

# Create service account for frontend QA runtime
echo -e "\n${YELLOW}Creating service account for Kruit website QA runtime...${NC}"
SERVICE_ACCOUNT_NAME="kruit-app-qa-sa"
SERVICE_ACCOUNT="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts describe ${SERVICE_ACCOUNT} 2>/dev/null || \
  gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
    --display-name "Kruit App QA Runtime SA"

# Fetch the kruit-contact Cloud Run QA service URL
echo -e "\n${YELLOW}Fetching ${CONTACT_SERVICE_NAME} service URL...${NC}"
VITE_CLOUD_RUN_URL=$(gcloud run services describe ${CONTACT_SERVICE_NAME} \
  --region ${REGION} \
  --format 'value(status.url)' 2>/dev/null || true)

if [ -z "${VITE_CLOUD_RUN_URL}" ]; then
  echo -e "${RED}WARNING: Could not find '${CONTACT_SERVICE_NAME}' service in ${REGION}.${NC}"
  echo -e "${YELLOW}  → Deploy cloud-run/deploy-qa.sh first, then re-run this script.${NC}"
  echo -e "${YELLOW}  → Proceeding without VITE_CLOUD_RUN_URL (contact form will not work).${NC}"
  VITE_CLOUD_RUN_URL=""
else
  echo -e "${GREEN}  ✓ Contact QA service URL: ${VITE_CLOUD_RUN_URL}${NC}"
fi

# Fetch the auth-service URL (from resume-vetting QA project)
echo -e "\n${YELLOW}Fetching ${AUTH_SERVICE_NAME} service URL...${NC}"
VITE_AUTH_API_BASE_URL=$(gcloud run services describe ${AUTH_SERVICE_NAME} \
  --region ${REGION} \
  --format 'value(status.url)' 2>/dev/null || true)

if [ -z "${VITE_AUTH_API_BASE_URL}" ]; then
  echo -e "${RED}ERROR: Could not find '${AUTH_SERVICE_NAME}' Cloud Run service in ${REGION}.${NC}"
  echo -e "${YELLOW}  → Deploy resume-vetting/auth-service first with QA config:${NC}"
  echo -e "${YELLOW}      cd ../resume-vetting/auth-service && bash deploy-qa.sh${NC}"
  exit 1
else
  echo -e "${GREEN}  ✓ Auth QA service URL: ${VITE_AUTH_API_BASE_URL}${NC}"
fi

# Setting QA specific URL for Resume Vetting
VITE_RESUME_VETTING_URL="https://resintel.viverekruit.ai/"

# Build env vars string
ENV_VARS="VITE_AUTH_API_BASE_URL=${VITE_AUTH_API_BASE_URL}"
[ -n "${VITE_CLOUD_RUN_URL}" ] && ENV_VARS="${ENV_VARS},VITE_CLOUD_RUN_URL=${VITE_CLOUD_RUN_URL}"
[ -n "${VITE_RESUME_VETTING_URL}" ] && ENV_VARS="${ENV_VARS},VITE_RESUME_VETTING_URL=${VITE_RESUME_VETTING_URL}"

# Deploy Cloud Run service from source
echo -e "\n${YELLOW}Deploying Cloud Run QA service from source...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --source . \
  --region ${REGION} \
  --platform managed \
  --allow-unauthenticated \
  --service-account "${SERVICE_ACCOUNT}" \
  --max-instances 2 \
  --min-instances 0 \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60s \
  --port 8080 \
  --set-env-vars "${ENV_VARS}"

# Get service URL
echo -e "\n${YELLOW}Getting Cloud Run service URL...${NC}"
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
  --region ${REGION} \
  --format 'value(status.url)')

if [ -z "${SERVICE_URL}" ]; then
  echo -e "\n${RED}ERROR: Could not retrieve service URL. Check deployment logs above.${NC}"
  exit 1
fi

echo -e "\n${GREEN}=== QA Deployment Complete ===${NC}\n"
echo -e "Service:          ${GREEN}${SERVICE_NAME}${NC}"
echo -e "Region:           ${GREEN}${REGION}${NC}"
echo -e "URL:              ${GREEN}${SERVICE_URL}${NC}"
echo -e "Auth API (QA):    ${GREEN}${VITE_AUTH_API_BASE_URL}${NC}"
[ -n "${VITE_RESUME_VETTING_URL}" ] && echo -e "Resume Vetting:   ${GREEN}${VITE_RESUME_VETTING_URL}${NC}"
[ -n "${VITE_CLOUD_RUN_URL}" ] && echo -e "Contact service:  ${GREEN}${VITE_CLOUD_RUN_URL}${NC}"

echo -e "\n${YELLOW}Open the app:${NC}"
echo -e "  ${SERVICE_URL}"

echo -e "\n${YELLOW}View logs:${NC}"
echo -e "  gcloud run services logs read ${SERVICE_NAME} --region ${REGION} --limit 50"
