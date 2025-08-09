/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' });
  }

  const upstreamUrl =
    process.env.GAS_ENDPOINT ||
    'https://script.google.com/macros/s/AKfycbzl11Z1PxufX0B2t4O9XrX9W3N4mWJOUuAejivJ-E67WL276q6wKuYJ1wFbUIBHIFGgDw/exec';

  try {
    let parsedBody = {};
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      const raw = await readRequestBody(req);
      try {
        parsedBody = raw ? JSON.parse(raw) : {};
      } catch (_) {
        parsedBody = {};
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const raw = await readRequestBody(req);
      parsedBody = Object.fromEntries(new URLSearchParams(raw));
    } else {
      // Fallback: try raw text
      const raw = await readRequestBody(req);
      parsedBody = raw ? { raw } : {};
    }

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedBody),
    });

    const text = await upstreamResponse.text();

    // Try to return JSON if possible
    try {
      const json = JSON.parse(text);
      return res.status(upstreamResponse.status).json(json);
    } catch (_) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(upstreamResponse.status).send(text);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Upstream error. Please try again.' });
  }
}
