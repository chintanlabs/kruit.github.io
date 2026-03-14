# Kruit.ai Contact Service — Cloud Run (Node.js)

An Express + Nodemailer micro-service that handles demo-request form submissions.
On every submission it sends two styled HTML emails via **Gmail SMTP** (free):

| Email | Recipient | Purpose |
|-------|-----------|--------|
| Internal notification | `TO_EMAIL` (Kruit team) | Structured summary with reply CTA |
| User confirmation | Submitter’s email | Professional “you’re all set” email |


## Prerequisites

| Tool | Min version |
|------|-------------|
| Python | 3.12 |
| Docker | 24+ |
| Google Cloud SDK (`gcloud`) | latest |
| Gmail account + App Password | — |

---

## Local development

```bash
# 1. Clone / navigate to this directory
cd cloud-run

# 2. Install dependencies
npm ci

# 3. Copy and populate the env file
cp .env.example .env
# Edit .env with your real values:
#   GMAIL_USER         — your Gmail address (e.g. kruitsupport@gmail.com)
#   GMAIL_APP_PASSWORD — 16-char App Password (see "Gmail SMTP setup" below)
#   TO_EMAIL           — sales@chintanlabs.com

# 4. Run the dev server
npm run dev
# → Service available at http://localhost:8080
```

### Test the endpoint

```bash
curl -X POST http://localhost:8080/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1 555 000 0000",
    "company": "Acme Corp",
    "message": "I would love a demo focused on AI-native assessments."
  }'
```

---

## Gmail SMTP setup (free)

> Uses Gmail's STARTTLS SMTP on port 587 — completely free with any Google account.

1. **Create (or use) a Gmail account** — e.g. `kruitsupport@gmail.com`.  
   The `From:` header in every outbound email will read `Kruit.ai <kruitsupport@gmail.com>`.
2. **Enable 2-Step Verification** at [myaccount.google.com/security](https://myaccount.google.com/security).
3. **Generate an App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) — select *Mail* / *Other device*.  
   You'll get a 16-char password (spaces don't matter). Copy it into `GMAIL_APP_PASSWORD`.
4. Free tier allows **up to 500 emails/day** via SMTP.

> **What to put in `FROM_EMAIL` / `GMAIL_USER`?**  
> Both sender emails (the notification *and* the user confirmation) come from `GMAIL_USER`.  
> The display name is set to `Kruit.ai` in the `From:` header, so recipients see  
> **Kruit.ai \<kruitsupport@gmail.com\>** — professional enough for demo volume.

---

## SendGrid?

Not needed — this service uses Python's stdlib `smtplib`. Zero cost, zero vendor lock-in.

---

## Deploy to Cloud Run

```bash
# 1. Authenticate
gcloud auth login
# 2. after setting variable in .env run,
bash ./deploy.sh
```
---

## Frontend integration

Set the Cloud Run URL in your Vite frontend environment:

```bash
# .env (local dev)
VITE_CLOUD_RUN_URL=http://localhost:8080

# .env.production
VITE_CLOUD_RUN_URL=https://kruit-contact-abc123-uc.a.run.app
```

---

## API reference

### `GET /health`
Returns `{"status": "ok"}`.

### `POST /contact`

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full name |
| `email` | string (email) | ✅ | Work email |
| `phone` | string | ❌ | Phone number |
| `company` | string | ❌ | Company name |
| `message` | string | ✅ | Details / context |

**Success — 200**
```json
{ "message": "Your request has been received. We'll be in touch within 24 hours!" }
```
