/**
 * /api/psu-report — Cloudflare Pages Function
 *
 * Accepts POST submissions from the PSU Reliability form.
 * Security:  CORS origin check, input validation against whitelist,
 *            IP-hash rate-limiting, honeypot anti-bot, parameterized SQL.
 * Storage:   Cloudflare D1 (SQLite at the edge), binding name PSU_DB.
 */

interface Env {
  PSU_DB: D1Database;
}

// ─── Whitelist of valid PSU IDs (must match psus.index.json) ─────────────────
const VALID_PSU_IDS = new Set([
  'corsair-rm1000x-2024',
  'corsair-rm850x-2024',
  'corsair-rm750x-2024',
  'corsair-hx1500i',
  'corsair-hx1200i',
  'seasonic-prime-tx-1000',
  'seasonic-prime-px-850',
  'seasonic-focus-gx-850',
  'seasonic-focus-gx-750',
  'seasonic-focus-gx-650',
  'bequiet-dark-power-13-1000',
  'bequiet-dark-power-13-850',
  'bequiet-straight-power-12-850',
  'bequiet-straight-power-12-750',
  'bequiet-pure-power-12-m-750',
  'evga-supernova-1000-g7',
  'evga-supernova-850-g7',
  'msi-meg-ai1300p',
  'msi-mpg-a1000g',
  'msi-mag-a850gl',
  'asus-rog-thor-1200p2',
  'asus-rog-strix-1000g',
  'asus-tuf-gaming-850g',
  'thermaltake-toughpower-gf3-850',
  'thermaltake-toughpower-gf3-1000',
  'fractal-ion-gold-850',
  'nzxt-c1200-gold',
  'nzxt-c850-gold',
  'silverstone-hela-850r',
  'coolermaster-v850-sfx',
  'corsair-sf750',
  'evga-supernova-650-g6',
  'corsair-cv650',
  'evga-600-ba',
  'thermaltake-smart-500',
]);

const VALID_FAILURE_MODES = new Set([
  'no-power',
  'random-shutdowns',
  'component-damage',
  'noise-sparks',
  'degraded-performance',
  'other',
]);

const ALLOWED_ORIGINS = new Set([
  'https://psucheck.com',
  'https://www.psucheck.com',
  'http://127.0.0.1:4321',
  'http://localhost:4321',
  'http://localhost:3000',
]);

// ─── CORS helper ─────────────────────────────────────────────────────────────
function corsHeaders(origin: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://psucheck.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

// ─── IP hashing (SHA-256, salted) ───────────────────────────────────────────
async function hashIp(ip: string, psuId: string): Promise<string> {
  const encoder = new TextEncoder();
  // Salt includes PSU ID so same user can report different PSUs
  const data = encoder.encode(`psucheck-2026:${ip}:${psuId}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 24);
}

// ─── OPTIONS handler (preflight) ────────────────────────────────────────────
export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

// ─── POST handler ────────────────────────────────────────────────────────────
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('Origin') ?? '';

  // 1. CORS: reject unknown origins
  if (!ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Content-type guard
  const contentType = request.headers.get('Content-Type') ?? '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
      status: 415,
      headers: corsHeaders(origin),
    });
  }

  // 3. Parse body (max 4KB to prevent abuse)
  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 4096) throw new Error('Body too large');
    body = JSON.parse(text);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON or body too large' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // 4. Honeypot: bots fill hidden fields, humans don't
  if (body._hp) {
    // Silent 200 so bots don't know they were blocked
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders(origin),
    });
  }

  // 5. Validate PSU ID
  const psuId = String(body.psuId ?? '');
  if (!VALID_PSU_IDS.has(psuId)) {
    return new Response(JSON.stringify({ error: 'Invalid PSU model' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // 6. Validate age
  const ageYears = parseFloat(String(body.ageYears ?? ''));
  if (isNaN(ageYears) || ageYears < 0 || ageYears > 25) {
    return new Response(JSON.stringify({ error: 'Age must be between 0 and 25 years' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // 7. Validate status
  const status = String(body.status ?? '');
  if (status !== 'running' && status !== 'failed') {
    return new Response(JSON.stringify({ error: 'Status must be "running" or "failed"' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // 8. Validate failure mode (required only when failed)
  const failureMode = status === 'failed' ? String(body.failureMode ?? '') : null;
  if (status === 'failed' && (!failureMode || !VALID_FAILURE_MODES.has(failureMode))) {
    return new Response(JSON.stringify({ error: 'Please select a failure mode' }), {
      status: 400,
      headers: corsHeaders(origin),
    });
  }

  // 9. Sanitize notes (strip HTML tags, limit 500 chars)
  const rawNotes = String(body.notes ?? '').trim();
  const notes = rawNotes
    ? rawNotes.replace(/<[^>]+>/g, '').replace(/[<>'"]/g, '').slice(0, 500) || null
    : null;

  // 10. Rate limiting: max 5 submissions per IP+PSU combo per 24 hours
  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
  const ipHash = await hashIp(ip, psuId);
  const windowStart = Math.floor(Date.now() / 1000) - 86400; // 24 hours ago

  const rateRow = await env.PSU_DB
    .prepare('SELECT COUNT(*) AS cnt FROM psu_reports WHERE ip_hash = ? AND created_at > ?')
    .bind(ipHash, windowStart)
    .first<{ cnt: number }>();

  if ((rateRow?.cnt ?? 0) >= 5) {
    return new Response(
      JSON.stringify({ error: 'Thank you — you have reached the daily report limit (5 per 24 hours).' }),
      { status: 429, headers: corsHeaders(origin) }
    );
  }

  // 11. Insert report
  await env.PSU_DB
    .prepare(
      `INSERT INTO psu_reports (psu_id, age_years, status, failure_mode, notes, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(psuId, ageYears, status, failureMode, notes, ipHash)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: corsHeaders(origin),
  });
};
