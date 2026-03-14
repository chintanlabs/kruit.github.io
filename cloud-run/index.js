'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

/* ── Config ──────────────────────────────────────────────────── */
const PORT = process.env.PORT || 8080;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TO_EMAIL = process.env.TO_EMAIL || 'sales@chintanlabs.com';

const rawOrigins = process.env.ALLOWED_ORIGINS || '*';
const allowedOrigins = rawOrigins === '*' ? '*' : rawOrigins.split(',').map((o) => o.trim());

/* ── Express setup ───────────────────────────────────────────── */
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: allowedOrigins,
        methods: ['POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
    })
);

/* ── Nodemailer transporter ──────────────────────────────────── */
function createTransporter() {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD environment variable is not set.');
    }
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_APP_PASSWORD,
        },
    });
}

/* ── Routes ──────────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/contact', async (req, res) => {
    const { name, email, phone = '', company = '', message } = req.body;

    // Basic validation
    if (!name || !name.trim()) return res.status(422).json({ detail: 'Name is required.' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return res.status(422).json({ detail: 'A valid email address is required.' });
    if (!message || !message.trim()) return res.status(422).json({ detail: 'Message is required.' });

    let transporter;
    try {
        transporter = createTransporter();
    } catch (err) {
        console.error('Transporter error:', err.message);
        return res.status(500).json({ detail: 'Email service is not configured.' });
    }

    const fromHeader = `Kruit.ai <${GMAIL_USER}>`;

    // 1 — Internal notification to the team
    try {
        await transporter.sendMail({
            from: fromHeader,
            to: TO_EMAIL,
            subject: `New Demo Request — ${name}`,
            html: buildInternalEmail({ name, email, phone, company, message }),
        });
        console.log(`[contact] Internal notification sent for ${email}`);
    } catch (err) {
        console.error('[contact] Failed to send internal notification:', err.message);
        return res.status(500).json({ detail: 'Failed to send notification email. Please try again.' });
    }

    // 2 — Confirmation to the user (best-effort)
    try {
        await transporter.sendMail({
            from: fromHeader,
            to: email,
            subject: "We've received your demo request — Kruit.ai",
            html: buildConfirmationEmail({ name, email, company }),
        });
        console.log(`[contact] Confirmation sent to ${email}`);
    } catch (err) {
        console.warn(`[contact] Could not send confirmation to ${email}:`, err.message);
    }

    return res.json({ message: "Your request has been received. We'll be in touch within 24 hours!" });
});

/* ── Email templates ─────────────────────────────────────────── */
function buildInternalEmail({ name, email, phone, company, message }) {
    const ts = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short', timeZone: 'UTC' }) + ' UTC';
    const phoneRow = phone ? `<tr><td style="${TD_LABEL}">Phone</td><td style="${TD_VALUE}">${phone}</td></tr>` : '';
    const companyRow = company ? `<tr><td style="${TD_LABEL}">Company</td><td style="${TD_VALUE}">${company}</td></tr>` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding-bottom:28px;text-align:center;">
            <div style="display:inline-block;padding:10px 20px;background:#1e3a8a;border-radius:8px;">
              <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">kruit.ai</span>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
            <div style="background:linear-gradient(135deg,#1d4ed8,#4f46e5);padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;color:#93c5fd;text-transform:uppercase;">New Inbound Request</p>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;">Demo Request Received</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#bfdbfe;">${ts}</p>
            </div>
            <div style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr><td style="${TD_LABEL}">Name</td><td style="${TD_VALUE}">${name}</td></tr>
                <tr><td style="${TD_LABEL}">Email</td>
                    <td style="${TD_VALUE}"><a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">${email}</a></td></tr>
                ${phoneRow}
                ${companyRow}
              </table>
              <div style="margin-top:24px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">Message</p>
                <div style="background:#0f172a;border:1px solid #334155;border-radius:10px;padding:16px 20px;">
                  <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${email}?subject=Re: Your Kruit.ai Demo Request"
                   style="display:inline-block;padding:12px 28px;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;border-radius:8px;">
                  Reply to ${name.split(' ')[0]} →
                </a>
              </div>
            </div>
            <div style="padding:16px 32px 24px;border-top:1px solid #1e293b;text-align:center;">
              <p style="margin:0;font-size:11px;color:#475569;">This is an automated notification from kruit.ai</p>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmail({ name, email, company }) {
    const first = name.split(' ')[0];
    const companyRow = company
        ? `<tr><td style="font-size:13px;color:#64748b;width:90px;">Company</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${company}</td></tr>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding-bottom:24px;text-align:center;">
            <div style="display:inline-block;padding:10px 20px;background:#1e3a8a;border-radius:8px;">
              <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">kruit.ai</span>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid #e2e8f0;">
            <div style="background:linear-gradient(135deg,#1d4ed8,#4f46e5);padding:36px 32px;text-align:center;">
              <div style="font-size:40px;margin-bottom:12px;">✅</div>
              <h1 style="margin:0 0 6px;font-size:26px;font-weight:800;color:#ffffff;">You're all set, ${first}!</h1>
              <p style="margin:0;font-size:15px;color:#bfdbfe;">We've received your demo request.</p>
            </div>
            <div style="padding:36px 32px;">
              <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
                Hi ${first}, thank you for reaching out to <strong>Kruit.ai</strong>. Our team will review your request and get back to you within <strong>24 hours</strong>.
              </p>
              <div style="background:#f1f5f9;border-radius:12px;padding:20px 24px;margin:24px 0;">
                <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">What happens next</p>
                ${step(1, 'Our team reviews your request', '#2563eb')}
                ${step(2, "We'll schedule a personalized walkthrough", '#4f46e5')}
                ${step(3, 'You get a tailored demo — no fluff', '#7c3aed')}
              </div>
              <div style="border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:1.5px;color:#94a3b8;text-transform:uppercase;">Your submission</p>
                <table width="100%" cellpadding="4" cellspacing="0">
                  <tr><td style="font-size:13px;color:#64748b;width:90px;">Name</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${name}</td></tr>
                  <tr><td style="font-size:13px;color:#64748b;">Email</td><td style="font-size:13px;color:#1e293b;font-weight:600;">${email}</td></tr>
                  ${companyRow}
                </table>
              </div>
              <p style="margin:0;font-size:13px;color:#94a3b8;text-align:center;">
                Need to reach us sooner? Reply to this email, we're happy to help.
              </p>
            </div>
            <div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">© 2026 Kruit.ai · All rights reserved</p>
              <p style="margin:0;font-size:11px;color:#cbd5e1;">You received this because you submitted a demo request at kruit.ai</p>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function step(num, text, color) {
    return `
<div style="display:flex;align-items:flex-start;margin-bottom:12px;">
  <div style="min-width:24px;height:24px;background:${color};border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;margin-right:12px;">${num}</div>
  <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${text}</p>
</div>`;
}

const TD_LABEL = 'font-size:12px;font-weight:700;letter-spacing:1.2px;color:#64748b;text-transform:uppercase;padding:8px 12px 8px 0;width:90px;vertical-align:top;';
const TD_VALUE = 'font-size:14px;color:#e2e8f0;padding:8px 0;vertical-align:top;';

/* ── Start ───────────────────────────────────────────────────── */
app.listen(PORT, () => {
    console.log(`Kruit contact service running on http://localhost:${PORT}`);
});
