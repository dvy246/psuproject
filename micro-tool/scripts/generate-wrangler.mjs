#!/usr/bin/env node
/**
 * generate-wrangler.mjs
 *
 * Automatically reads database config from the local gitignored .env file
 * and generates wrangler.toml dynamically before Astro builds/deploys.
 *
 * This keeps the raw database_id secure and prevents committing it to git.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_FILE = path.join(__dirname, '../.env');
const WRANGLER_TOML = path.join(__dirname, '../wrangler.toml');

function main() {
  console.log('[generate-wrangler] Generating wrangler.toml from .env...');

  if (!existsSync(ENV_FILE)) {
    console.warn('[generate-wrangler] ⚠ No .env file found. Cannot generate wrangler.toml.');
    return;
  }

  try {
    const envContent = readFileSync(ENV_FILE, 'utf8');
    
    // Simple regex parser for env values (handling single, double, or no quotes)
    const dbIdMatch = envContent.match(/database_id\s*=\s*['"]?([a-zA-Z0-9-]+)['"]?/i);
    const dbNameMatch = envContent.match(/database_name\s*=\s*['"]?([a-zA-Z0-9-]+)['"]?/i);

    const dbId = dbIdMatch ? dbIdMatch[1] : null;
    const dbName = dbNameMatch ? dbNameMatch[1] : 'psu-reliability';

    if (!dbId) {
      console.warn('[generate-wrangler] ⚠ database_id not found in .env. Skipping wrangler.toml generation.');
      return;
    }

    const tomlContent = `name = "pc"
pages_build_output_dir = "dist"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# ─── D1 Database: PSU Reliability (Auto-generated from .env) ───────────
[[d1_databases]]
binding = "PSU_DB"
database_name = "${dbName}"
database_id = "${dbId}"
`;

    writeFileSync(WRANGLER_TOML, tomlContent, 'utf8');
    console.log(`[generate-wrangler] ✓ Successfully generated wrangler.toml with database_id: ${dbId}`);

  } catch (err) {
    console.error('[generate-wrangler] ✗ Failed to generate wrangler.toml:', err.message);
  }
}

main();
