/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
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
  const cfg = parsed.installed || parsed.web;

  if (!cfg) {
    throw new Error("Invalid oauth-client.json format (no installed/web key)");
  }

  const { client_id, client_secret, redirect_uris } = cfg;

  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

function getAuthenticatedClient() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(
      `No tokens.json found. Run "node database-backup/auth-google.js" first to authorize.`
    );
  }

  const oAuth2Client = loadOAuthClient();
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

export async function uploadToGoogleDrive(localPath, filename) {
  try {
    const auth = getAuthenticatedClient();
    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: filename,
    };

    if (process.env.GOOGLE_DRIVE_FOLDER_ID) {
      fileMetadata.parents = [process.env.GOOGLE_DRIVE_FOLDER_ID];
    }

    const media = {
      mimeType: "application/json",
      body: fs.createReadStream(localPath),
    };

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, name",
    });

    console.log(
      `☁️ Uploaded to Google Drive as YOU: ${res.data.name} (${res.data.id})`
    );
  } catch (err) {
    console.error("❌ Google Drive upload failed:", err.message || err);
  }
}
