#!/bin/bash
# =============================================================================
# Kruit.ai Contact Service — Cloud Run deployment script
#
# What this script does:
#   1. Enables required GCP APIs
#   2. Creates a dedicated service account
#   3. Stores secrets (GMAIL_APP_PASSWORD, TO_EMAIL, GMAIL_USER,
#      ALLOWED_ORIGINS) in Secret Manager — creates or updates each one
#   4. Grants the service account access to those secrets
#   5. Builds the Docker image and pushes it to Artifact Registry
#   6. Deploys to Cloud Run, wiring all secrets from Secret Manager
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
#
# Requirements:
#   - gcloud CLI authenticated  (gcloud auth login)
#   - PROJECT_ID set below, or exported in your shell before running
#   - .env file present in this directory with real values
# =============================================================================
set -euo pipefail

# ── Colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

info()    { echo -e "${CYAN}  ▸ $*${NC}"; }
success() { echo -e "${GREEN}  ✓ $*${NC}"; }
warn()    { echo -e "${YELLOW}  ⚠ $*${NC}"; }
die()     { echo -e "${RED}  ✗ $*${NC}" >&2; exit 1; }

# ── Configuration ─────────────────────────────────────────────────────────────
PROJECT_ID="${PROJECT_ID:-sandbox-487605}"           # override with: export PROJECT_ID=xxx
REGION="${REGION:-us-central1}"
SERVICE_NAME="kruit-contact"
IMAGE_REPO="contact-service"
SA_NAME="kruit-contact-sa"

# Secret names (keys in Secret Manager)
SECRET_GMAIL_USER="kruit-contact-gmail-user"
SECRET_GMAIL_PASS="kruit-contact-gmail-app-password"
SECRET_TO_EMAIL="kruit-contact-to-email"
SECRET_ORIGINS="kruit-contact-allowed-origins"

# ── Load .env ────────────────────────────────────────────────────────────────
ENV_FILE="$(dirname "$0")/.env"
[[ -f "$ENV_FILE" ]] || die ".env file not found at $ENV_FILE — copy .env.example and fill it in."

# Source the .env safely, preserving quoted values and spaces
# Use allexport so variables become exported into the environment
set -o allexport
# shellcheck disable=SC1090
. "$ENV_FILE"
set +o allexport

[[ -n "${GMAIL_USER:-}"         ]] || die "GMAIL_USER is empty in .env"
[[ -n "${GMAIL_APP_PASSWORD:-}" ]] || die "GMAIL_APP_PASSWORD is empty in .env"
[[ -n "${TO_EMAIL:-}"           ]] || die "TO_EMAIL is empty in .env"
ALLOWED_ORIGINS="${ALLOWED_ORIGINS:-*}"

# ── Banner ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Kruit.ai Contact Service — Cloud Run Deploy   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Project : ${YELLOW}${PROJECT_ID}${NC}"
echo -e "  Region  : ${YELLOW}${REGION}${NC}"
echo -e "  Service : ${YELLOW}${SERVICE_NAME}${NC}"
echo ""

# ── Step 1: Set project & enable APIs ────────────────────────────────────────
echo -e "${YELLOW}[1/6] Setting project and enabling APIs...${NC}"
gcloud config set project "${PROJECT_ID}"

gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  --quiet

success "APIs enabled"

# ── Step 2: Artifact Registry repo ───────────────────────────────────────────
echo -e "\n${YELLOW}[2/6] Ensuring Artifact Registry repository...${NC}"
if gcloud artifacts repositories describe "${IMAGE_REPO}" \
     --location="${REGION}" &>/dev/null; then
  info "Repository '${IMAGE_REPO}' already exists — skipping"
else
  gcloud artifacts repositories create "${IMAGE_REPO}" \
    --repository-format=docker \
    --location="${REGION}" \
    --description="Kruit contact service images" \
    --quiet
  success "Repository '${IMAGE_REPO}' created"
fi

IMAGE="$(gcloud artifacts repositories describe "${IMAGE_REPO}" \
  --location="${REGION}" \
  --format='value(name)' | sed 's|projects/[^/]*/locations/\([^/]*\)/repositories/\([^/]*\)|'"${REGION}"'-docker.pkg.dev/'"${PROJECT_ID}"'/'"${IMAGE_REPO}"'|')"
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${IMAGE_REPO}/${SERVICE_NAME}:latest"
info "Image target: ${IMAGE}"

# ── Step 3: Service account ───────────────────────────────────────────────────
echo -e "\n${YELLOW}[3/6] Setting up service account...${NC}"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

if gcloud iam service-accounts describe "${SA_EMAIL}" &>/dev/null; then
  info "Service account '${SA_EMAIL}' already exists — skipping"
else
  gcloud iam service-accounts create "${SA_NAME}" \
    --display-name="Kruit Contact Service Runtime SA" \
    --quiet
  success "Service account '${SA_EMAIL}' created"
fi

# ── Step 4: Secrets ───────────────────────────────────────────────────────────
echo -e "\n${YELLOW}[4/6] Storing secrets in Secret Manager...${NC}"

# Helper: create or update a secret
upsert_secret() {
  local name="$1"
  local value="$2"

  if gcloud secrets describe "${name}" &>/dev/null; then
    # Add a new version
    echo -n "${value}" | gcloud secrets versions add "${name}" --data-file=- --quiet
    info "Secret '${name}' — new version added"
  else
    echo -n "${value}" | gcloud secrets create "${name}" \
      --replication-policy="automatic" \
      --data-file=- \
      --quiet
    success "Secret '${name}' created"
  fi

  # Grant the service account access
  gcloud secrets add-iam-policy-binding "${name}" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/secretmanager.secretAccessor" \
    --quiet &>/dev/null
}

upsert_secret "${SECRET_GMAIL_USER}"  "${GMAIL_USER}"
upsert_secret "${SECRET_GMAIL_PASS}"  "${GMAIL_APP_PASSWORD}"
upsert_secret "${SECRET_TO_EMAIL}"    "${TO_EMAIL}"
upsert_secret "${SECRET_ORIGINS}"     "${ALLOWED_ORIGINS}"

success "All secrets stored and IAM bindings applied"

# ── Step 5: Build & push image ────────────────────────────────────────────────
echo -e "\n${YELLOW}[5/6] Building and pushing Docker image...${NC}"
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

gcloud builds submit . \
  --tag "${IMAGE}" \
  --region "${REGION}" \
  --quiet

success "Image pushed: ${IMAGE}"

# ── Step 6: Deploy to Cloud Run ───────────────────────────────────────────────
echo -e "\n${YELLOW}[6/6] Deploying to Cloud Run...${NC}"

gcloud run deploy "${SERVICE_NAME}" \
  --image "${IMAGE}" \
  --region "${REGION}" \
  --platform managed \
  --allow-unauthenticated \
  --service-account "${SA_EMAIL}" \
  --max-instances 10 \
  --min-instances 0 \
  --memory 256Mi \
  --cpu 1 \
  --concurrency 80 \
  --timeout 30s \
  --port 8080 \
  --set-secrets="GMAIL_USER=${SECRET_GMAIL_USER}:latest,\
GMAIL_APP_PASSWORD=${SECRET_GMAIL_PASS}:latest,\
TO_EMAIL=${SECRET_TO_EMAIL}:latest,\
ALLOWED_ORIGINS=${SECRET_ORIGINS}:latest" \
  --quiet

# ── Done ──────────────────────────────────────────────────────────────────────
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
  --region "${REGION}" \
  --format='value(status.url)')

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              Deployment complete! 🚀             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  URL      : ${GREEN}${SERVICE_URL}${NC}"
echo -e "  Health   : ${GREEN}${SERVICE_URL}/health${NC}"
echo ""
echo -e "${YELLOW}  Test it:${NC}"
echo -e "  curl -X POST ${SERVICE_URL}/contact \\"
echo -e "    -H 'Content-Type: application/json' \\"
echo -e "    -d '{\"name\":\"Test\",\"email\":\"you@example.com\",\"message\":\"Hello\"}'"
echo ""
echo -e "${YELLOW}  Update VITE_CLOUD_RUN_URL in your frontend .env.production:${NC}"
echo -e "  VITE_CLOUD_RUN_URL=${SERVICE_URL}"
echo ""
echo -e "${YELLOW}  View logs:${NC}"
echo -e "  gcloud run services logs read ${SERVICE_NAME} --region ${REGION} --limit 50"
echo ""
