/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import readline from "readline";
import { google } from "googleapis";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = path.join(__dirname, "tokens.json");

function loadOAuthClient() {
  const clientPath =
    process.env.GOOGLE_OAUTH_CLIENT_FILE || "./oauth-client.json";

  const raw = fs.readFileSync(clientPath, "utf8");
  const parsed = JSON.parse(raw);
  // Depending on how Google formats it, use installed or web
  const cfg = parsed.installed || parsed.web;

  if (!cfg) {
    throw new Error("Invalid oauth-client.json format (no installed/web key)");
  }

  const { client_id, client_secret, redirect_uris } = cfg;

  return new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0] // usually http://localhost for desktop app
  );
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function main() {
  const oAuth2Client = loadOAuthClient();

  const scopes = ["https://www.googleapis.com/auth/drive.file"];

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // ensure refresh token
  });

  console.log("\nAuthorize this app by visiting this URL:\n");
  console.log(authUrl);
  console.log("");

  const code = await askQuestion("Paste the code from that page here: ");

  const { tokens } = await oAuth2Client.getToken(code.trim());
  oAuth2Client.setCredentials(tokens);

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf8");
  console.log(`\nSUCCESS: Tokens stored at ${TOKEN_PATH}`);
}

main().catch((err) => {
  console.error("❌ Auth failed:", err);
  process.exit(1);
});
