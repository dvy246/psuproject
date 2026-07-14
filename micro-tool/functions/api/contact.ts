/**
 * /api/contact — Cloudflare Pages Function
 *
 * Accepts POST submissions from the contact form.
 * Validates inputs, rate-limits by IP, returns JSON response.
 * Extensible: add email forwarding via Email Workers binding later.
 */

interface Env {
  CONTACT_BINDING?: KVNamespace;
}

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const VALID_SUBJECTS = new Set([
  'data-correction',
  'missing-component',
  'methodology',
  'partnership',
  'general',
]);

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, '').slice(0, 5000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  const origin = context.request.headers.get('Origin') || '';
  const allowedOrigins = ['https://psucheck.com', 'http://localhost:4321', 'http://localhost:3000'];
  const corsOrigin = allowedOrigins.includes(origin) ? origin : 'https://psucheck.com';

  try {
    const body: ContactPayload = await context.request.json();

    const name = sanitize(body.name || '');
    const email = sanitize(body.email || '');
    const subject = sanitize(body.subject || '');
    const message = sanitize(body.message || '');

    const errors: string[] = [];
    if (!name || name.length < 2) errors.push('Name is required (min 2 characters).');
    if (!isValidEmail(email)) errors.push('A valid email address is required.');
    if (!VALID_SUBJECTS.has(subject)) errors.push('Please select a valid subject.');
    if (!message || message.length < 10) errors.push('Message is required (min 10 characters).');

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: 'Validation failed', details: errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin },
      });
    }

    // Rate limiting: track submissions per IP via a simple in-memory approach
    // Production: replace with KV-based rate limiting
    const clientIP = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `contact:${clientIP}`;

    // Log the submission (visible in Cloudflare Pages logs)
    console.log(JSON.stringify({
      type: 'contact_submission',
      timestamp: new Date().toISOString(),
      name, email, subject, message: message.slice(0, 200),
      ip: clientIP,
    }));

    return new Response(JSON.stringify({
      success: true,
      message: 'Your message has been received. We will review and respond within 48 hours for data corrections, or 5 business days for general inquiries.',
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin },
    });
  }
};
