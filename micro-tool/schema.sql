-- PSU Reliability Reports — D1 Schema
-- Run: npx wrangler d1 execute psu-reliability --remote --file=./schema.sql

-- Main reports table
CREATE TABLE IF NOT EXISTS psu_reports (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  psu_id       TEXT    NOT NULL,
  age_years    REAL    NOT NULL CHECK(age_years >= 0 AND age_years <= 25),
  status       TEXT    NOT NULL CHECK(status IN ('running', 'failed')),
  failure_mode TEXT             CHECK(
                 failure_mode IN (
                   'no-power',
                   'random-shutdowns',
                   'component-damage',
                   'noise-sparks',
                   'degraded-performance',
                   'other'
                 ) OR failure_mode IS NULL
               ),
  notes        TEXT             CHECK(length(notes) <= 500),
  ip_hash      TEXT    NOT NULL,
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Indexes for fast aggregation queries
CREATE INDEX IF NOT EXISTS idx_reports_psu     ON psu_reports(psu_id);
CREATE INDEX IF NOT EXISTS idx_reports_ip_time ON psu_reports(ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_reports_status  ON psu_reports(psu_id, status);
