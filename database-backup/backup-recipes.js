/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { uploadToGoogleDrive } from "./google-drive.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function fetchAllRecipes() {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) {
    console.error("❌ Error fetching recipes:", error);
    throw error;
  }

  return data || [];
}

function buildBackupFilename() {
  const iso = new Date().toISOString().replace(/[:.]/g, "-");
  return `recipes-backup-${iso}.json`;
}

async function main() {
  console.log("📦 Fetching recipes from Supabase…");
  const recipes = await fetchAllRecipes();

  const filename = buildBackupFilename();
  const outDir = process.env.BACKUP_DIR || path.join(process.cwd(), "backups");
  const fullPath = path.join(outDir, filename);

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(fullPath, JSON.stringify(recipes, null, 2), "utf8");

  console.log(`💾 Saved backup: ${fullPath}`);
  console.log(`🧾 Recipe count: ${recipes.length}`);

  await uploadToGoogleDrive(fullPath, filename);
}

main().catch((err) => {
  console.error("❌ Backup failed:", err);
  process.exit(1);
});
