import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json({ limit: "256kb" }));

// ── Env check at startup ──
const REQUIRED_ENV = [
  "NOTIFY_SMTP_USER",
  "NOTIFY_SMTP_APP_PASSWORD",
  "CONFIRM_SMTP_USER",
  "CONFIRM_SMTP_APP_PASSWORD",
  "COLLAB_EMAIL",
];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.warn(`[server] WARNING: Environment variable ${key} is not set.`);
  }
}

// ── Rate limiting (basic in-memory) ──
const rateMap = new Map();
const RATE_WINDOW = 60_000;
const RATE_MAX = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const rec = rateMap.get(ip) || { count: 0, resetAt: now + RATE_WINDOW };
  if (now > rec.resetAt) {
    rec.count = 0;
    rec.resetAt = now + RATE_WINDOW;
  }
  rec.count++;
  rateMap.set(ip, rec);
  return rec.count > RATE_MAX;
}

// ── HTML escape ──
function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Validation ──
function validate(data) {
  const errs = [];
  if (!data.name?.trim())    errs.push("Name is required.");
  if (!data.email?.trim())   errs.push("Email is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) errs.push("Invalid email address.");
  if (!data.message?.trim()) errs.push("Message is required.");
  if ((data.name ?? "").length > 200)     errs.push("Name is too long.");
  if ((data.message ?? "").length > 5000) errs.push("Message is too long.");
  if (data.website) errs.push("Spam detected."); // honeypot
  return errs;
}

// ── Transporter 1: researchclaude007@gmail.com ──
// Used to send the internal notification TO collabstudio.in@gmail.com
function makeNotifyTransporter() {
  if (!process.env.NOTIFY_SMTP_USER || !process.env.NOTIFY_SMTP_APP_PASSWORD) {
    throw new Error(
      "SMTP credentials missing. Set NOTIFY_SMTP_USER and NOTIFY_SMTP_APP_PASSWORD in your .env file."
    );
  }
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NOTIFY_SMTP_USER,
      pass: process.env.NOTIFY_SMTP_APP_PASSWORD,
    },
  });
}

// ── Transporter 2: collabstudio.in@gmail.com ──
// Used to send the confirmation email TO the client
function makeConfirmTransporter() {
  if (!process.env.CONFIRM_SMTP_USER || !process.env.CONFIRM_SMTP_APP_PASSWORD) {
    throw new Error(
      "SMTP credentials missing. Set CONFIRM_SMTP_USER and CONFIRM_SMTP_APP_PASSWORD in your .env file."
    );
  }
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.CONFIRM_SMTP_USER,
      pass: process.env.CONFIRM_SMTP_APP_PASSWORD,
    },
  });
}

// ── Internal notification email (to Collab) ──
function internalHtml(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const row = (label, val) =>
    `<tr>
      <td style="padding:8px 16px 8px 0;color:#888;vertical-align:top;width:110px;font-size:13px;">${label}</td>
      <td style="padding:8px 0;color:#1a1a1a;font-size:13px;">${esc(val || "Not provided")}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f0;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;padding:36px;border:1px solid #e0e0d8;">
    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Collab Enquiries</p>
    <h1 style="margin:0 0 24px;font-size:18px;font-weight:600;color:#1a1a1a;">New Project Enquiry</h1>
    <hr style="border:none;border-top:1px solid #e0e0d8;margin:0 0 20px;">
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Business", data.business)}
      ${row("Service", data.service)}
      ${row("Budget", data.budget)}
    </table>
    <hr style="border:none;border-top:1px solid #e0e0d8;margin:20px 0;">
    <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Project Details</p>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#1a1a1a;white-space:pre-wrap;">${esc(data.message)}</p>
    <hr style="border:none;border-top:1px solid #e0e0d8;margin:20px 0;">
    <p style="margin:0;font-size:11px;color:#aaa;">Submitted: ${now}</p>
  </div>
</body>
</html>`;
}

function internalText(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return `NEW PROJECT ENQUIRY

Name:     ${data.name || "Not provided"}
Email:    ${data.email || "Not provided"}
Phone:    ${data.phone || "Not provided"}
Business: ${data.business || "Not provided"}
Service:  ${data.service || "Not provided"}
Budget:   ${data.budget || "Not provided"}

Project Details:
${data.message || ""}

Submitted: ${now}
`;
}

// ── Customer confirmation email ──
function customerHtml(data) {
  const firstName = (data.name || "").trim().split(" ")[0] || "there";
  const summaryRow = (label, val) =>
    val
      ? `<tr>
          <td style="padding:5px 16px 5px 0;color:#888;font-size:13px;width:80px;">${label}</td>
          <td style="padding:5px 0;color:#1a1a1a;font-size:13px;">${esc(val)}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f4f4f0;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;padding:36px;border:1px solid #e0e0d8;">
    <p style="margin:0 0 4px;font-size:14px;font-weight:600;letter-spacing:0.04em;color:#1a1a1a;">collab.</p>
    <h1 style="margin:8px 0 24px;font-size:20px;font-weight:600;color:#1a1a1a;line-height:1.3;">We've got your enquiry.</h1>
    <hr style="border:none;border-top:1px solid #e0e0d8;margin:0 0 24px;">

    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#1a1a1a;">Hi ${esc(firstName)},</p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#1a1a1a;">Thanks for reaching out to Collab.</p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:#1a1a1a;">We've received your project enquiry successfully. We'll review the details and get back to you shortly to discuss the project and next steps.</p>

    <hr style="border:none;border-top:1px solid #e0e0d8;margin:0 0 20px;">
    <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Your enquiry summary</p>
    <table style="width:100%;border-collapse:collapse;">
      ${summaryRow("Business", data.business)}
      ${summaryRow("Service", data.service)}
      ${summaryRow("Budget", data.budget)}
    </table>

    <hr style="border:none;border-top:1px solid #e0e0d8;margin:20px 0;">
    <p style="margin:0 0 14px;font-size:13px;line-height:1.7;color:#555;">You don't need to submit the form again — we've got it. If you need to add anything else, reply directly to this email.</p>

    <p style="margin:20px 0 2px;font-size:13px;color:#1a1a1a;font-weight:500;">— Collab</p>
    <p style="margin:0 0 2px;font-size:12px;color:#888;">Web Design &amp; Development</p>
    <p style="margin:0;font-size:12px;"><a href="mailto:collabstudio.in@gmail.com" style="color:#888;text-decoration:none;">collabstudio.in@gmail.com</a></p>
  </div>
</body>
</html>`;
}

function customerText(data) {
  const firstName = (data.name || "").trim().split(" ")[0] || "there";
  return `Hi ${firstName},

Thanks for reaching out to Collab.

We've received your project enquiry successfully. We'll review the details and get back to you shortly.

Your enquiry summary:
Business: ${data.business || "—"}
Service:  ${data.service || "—"}
Budget:   ${data.budget || "—"}

You don't need to submit the form again — we've got it.
If you need to add anything else, reply directly to this email.

— Collab
Web Design & Development
collabstudio.in@gmail.com
`;
}

// ── POST /api/enquiry ──
app.post("/api/enquiry", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;
    if (isRateLimited(ip)) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please wait a minute and try again.",
      });
    }

    const data = req.body ?? {};
    const errs = validate(data);
    if (errs.length) {
      return res.status(400).json({ success: false, message: errs[0] });
    }

    // Sanitise inputs
    const clean = {
      name:     data.name.trim(),
      email:    data.email.trim().toLowerCase(),
      phone:    (data.phone    ?? "").trim(),
      business: (data.business ?? "").trim(),
      service:  (data.service  ?? "").trim(),
      budget:   (data.budget   ?? "").trim(),
      message:  data.message.trim(),
    };

    const collabEmail   = process.env.COLLAB_EMAIL || "collabstudio.in@gmail.com";
    const notifyFrom    = process.env.NOTIFY_SMTP_USER;   // researchclaude007@gmail.com
    const confirmFrom   = process.env.CONFIRM_SMTP_USER;  // collabstudio.in@gmail.com
    const subjectLabel  = clean.business || clean.name;

    const notifyTransporter  = makeNotifyTransporter();
    const confirmTransporter = makeConfirmTransporter();

    await Promise.all([
      // Email 1: Internal notification
      // FROM researchclaude007@gmail.com → TO collabstudio.in@gmail.com
      notifyTransporter.sendMail({
        from:    `"Collab Enquiries" <${notifyFrom}>`,
        to:      collabEmail,
        replyTo: clean.email,
        subject: `New Collab enquiry — ${subjectLabel}`,
        text:    internalText(clean),
        html:    internalHtml(clean),
      }),

      // Email 2: Customer confirmation
      // FROM collabstudio.in@gmail.com → TO client's email
      confirmTransporter.sendMail({
        from:    `"Collab" <${confirmFrom}>`,
        to:      clean.email,
        replyTo: collabEmail,
        subject: "We received your enquiry — Collab",
        text:    customerText(clean),
        html:    customerHtml(clean),
      }),
    ]);

    return res.status(200).json({ success: true, message: "Enquiry sent successfully." });

  } catch (err) {
    if (err.message?.includes("SMTP") || err.code === "EAUTH") {
      console.error(
        "[server] SMTP auth error — check credentials in .env:",
        err.message
      );
    } else {
      console.error("[server] Enquiry error:", err);
    }
    return res.status(500).json({
      success: false,
      message:
        "We couldn't send your enquiry right now. Please try again or email us directly at collabstudio.in@gmail.com",
    });
  }
});

// ── Health check ──
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server] Collab API running on http://localhost:${PORT}`);
});
