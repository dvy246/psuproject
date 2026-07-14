#!/usr/bin/env node
/**
 * sync-psu-counts.mjs
 *
 * Pre-build script: reads aggregate data from Cloudflare D1 via Wrangler,
 * then writes src/data/psu-report-counts.json for use in static page generation.
 *
 * Fails gracefully — if Wrangler is not configured or D1 is not yet set up,
 * it keeps the existing seed file unchanged and logs a warning.
 *
 * Usage: called automatically via `prebuild` in package.json.
 * Can also be run manually: node scripts/sync-psu-counts.mjs
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COUNTS_FILE = path.join(__dirname, '../src/data/psu-report-counts.json');

// Minimum sample size to trust data (not displayed publicly below this threshold)
const MIN_SAMPLE_SIZE = 30;

async function main() {
  console.log('[sync-psu-counts] Reading PSU reliability data from D1...');

  // Check if database_id has been configured
  const wranglerToml = readFileSync(path.join(__dirname, '../wrangler.toml'), 'utf8');
  if (wranglerToml.includes('PASTE_YOUR_DATABASE_ID_HERE')) {
    console.warn('[sync-psu-counts] ⚠ D1 database_id not configured in wrangler.toml — skipping sync.');
    console.warn('[sync-psu-counts]   Run `npx wrangler d1 create psu-reliability` then update wrangler.toml.');
    return;
  }

  try {
    // Query 1: Aggregate stats per PSU
    const aggResult = execSync(
      `npx wrangler d1 execute psu-reliability --remote --json --command "` +
      `SELECT psu_id, ` +
      `COUNT(*) AS total, ` +
      `SUM(CASE WHEN status='running' THEN 1 ELSE 0 END) AS running, ` +
      `SUM(CASE WHEN status='failed' THEN 1 ELSE 0 END) AS failed, ` +
      `AVG(CASE WHEN status='running' THEN age_years END) AS avg_age_running ` +
      `FROM psu_reports GROUP BY psu_id"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );

    // Query 2: Failure mode breakdown
    const modesResult = execSync(
      `npx wrangler d1 execute psu-reliability --remote --json --command "` +
      `SELECT psu_id, failure_mode, COUNT(*) AS cnt ` +
      `FROM psu_reports WHERE status='failed' AND failure_mode IS NOT NULL ` +
      `GROUP BY psu_id, failure_mode"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );

    const aggRows  = JSON.parse(aggResult)[0]?.results  ?? [];
    const modeRows = JSON.parse(modesResult)[0]?.results ?? [];

    // Load existing file to preserve structure
    const existing = JSON.parse(readFileSync(COUNTS_FILE, 'utf8'));

    // Build failure modes lookup
    const failureModeMap = {};
    for (const row of modeRows) {
      if (!failureModeMap[row.psu_id]) failureModeMap[row.psu_id] = {};
      failureModeMap[row.psu_id][row.failure_mode] = row.cnt;
    }

    // Merge D1 data into counts
    let totalReports = 0;
    for (const row of aggRows) {
      if (existing.byPsu[row.psu_id]) {
        existing.byPsu[row.psu_id] = {
          total:          row.total,
          running:        row.running,
          failed:         row.failed,
          avgAgeRunning:  row.avg_age_running ? parseFloat(row.avg_age_running.toFixed(1)) : null,
          failureModes:   failureModeMap[row.psu_id] ?? {},
        };
        totalReports += row.total;
      }
    }


    existing.totalReports = totalReports;
    existing.lastUpdated  = new Date().toISOString();

    writeFileSync(COUNTS_FILE, JSON.stringify(existing, null, 2));
    console.log(`[sync-psu-counts] ✓ Updated ${COUNTS_FILE} — ${totalReports} total reports.`);

  } catch (err) {
    console.warn('[sync-psu-counts] ⚠ Could not sync from D1 (keeping existing data):');
    console.warn(' ', err.message ?? err);
  }
}

main();
