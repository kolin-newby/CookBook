/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import fsNode from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function findLatestBackupFile() {
  const backupsDir =
    process.env.BACKUP_DIR || path.join(process.cwd(), "backups");

  let entries;
  try {
    entries = await fs.readdir(backupsDir, { withFileTypes: true });
  } catch (err) {
    console.error(`❌ Could not read backups directory: ${backupsDir}`);
    throw err;
  }

  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith(".json"))
    .map((e) => {
      const fullPath = path.join(backupsDir, e.name);
      const stat = fsNode.statSync(fullPath);
      return {
        name: e.name,
        fullPath,
        mtime: stat.mtime.getTime(),
      };
    });

  if (files.length === 0) {
    throw new Error(`No .json backup files found in ${backupsDir}`);
  }

  files.sort((a, b) => b.mtime - a.mtime);
  return files[0].fullPath;
}

async function loadBackupFile(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Backup file JSON is not an array");
  }

  return parsed;
}

async function restoreRecipes(recipes) {
  console.log(`🧾 Restoring ${recipes.length} recipes…`);

  const batchSize = 200;
  for (let i = 0; i < recipes.length; i += batchSize) {
    const batch = recipes.slice(i + 0, i + batchSize);

    console.log(
      `⬆️  Upserting recipes ${i + 1}–${Math.min(
        i + batchSize,
        recipes.length
      )}...`
    );

    const { error } = await supabase
      .from("recipes")
      // adjust "id" if your unique key is different
      .upsert(batch, { onConflict: "id" });

    if (error) {
      console.error("❌ Error during upsert:", error);
      throw error;
    }
  }

  console.log("✅ Restore complete.");
}

async function main() {
  let filePath = process.argv[2];

  if (!filePath) {
    console.log("No file path provided. Using latest backup in BACKUP_DIR…");
    filePath = await findLatestBackupFile();
  } else if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath);
  }

  console.log(`📂 Using backup file: ${filePath}`);

  const recipes = await loadBackupFile(filePath);
  console.log(`Found ${recipes.length} recipe records in backup.`);

  await restoreRecipes(recipes);
}

main().catch((err) => {
  console.error("❌ Restore failed:", err);
  process.exit(1);
});
