// Verify the Resend API key, or send one test email with --send.
// Examples:
//   npm run resend:verify
//   npm run email:test

const fs = require("node:fs");

function loadLocalEnv() {
  try {
    const content = fs.readFileSync(".env.local", "utf8");
    const values = {};

    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match || match[1].startsWith("#")) continue;

      values[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }

    return values;
  } catch {
    return {};
  }
}

const localEnv = loadLocalEnv();
const apiKey = process.env.RESEND_API_KEY || localEnv.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_EMAIL || localEnv.CONTACT_EMAIL;
const shouldSend = process.argv.includes("--send");

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

async function verifyResend() {
  console.log("🔍 Checking Resend configuration...\n");
  console.log(`RESEND_API_KEY: ${apiKey ? "✅ Set (hidden)" : "❌ Missing"}`);
  console.log(`CONTACT_EMAIL: ${recipientEmail || "❌ Missing"}`);

  if (!apiKey || !recipientEmail) {
    fail("Set RESEND_API_KEY and CONTACT_EMAIL in .env.local.");
    return;
  }

  if (!apiKey.startsWith("re_")) {
    fail("RESEND_API_KEY should start with re_.");
    return;
  }

  const response = await fetch("https://api.resend.com/domains", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    fail(`Resend rejected the API key (${response.status}): ${result.message || "Unknown error"}`);
    return;
  }

  console.log("✅ Resend API key accepted.");

  if (!shouldSend) {
    console.log("ℹ️  API verification only; no email was sent.");
    return;
  }

  console.log("📤 Sending a test email...");

  const sendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Test <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: "Portfolio Resend test",
      text: "This is a test email for the portfolio contact form.",
    }),
  });

  const sendResult = await sendResponse.json().catch(() => ({}));

  if (!sendResponse.ok) {
    fail(`Resend rejected the test email (${sendResponse.status}): ${sendResult.message || "Unknown error"}`);
    return;
  }

  console.log(`✅ Test email accepted by Resend. ID: ${sendResult.id || "unknown"}`);
}

verifyResend().catch((error) => {
  fail(`Resend request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
});
