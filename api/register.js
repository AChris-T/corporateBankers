export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const upstreamUrl =
    process.env.GAS_ENDPOINT ||
    'https://script.google.com/macros/s/AKfycbzl11Z1PxufX0B2t4O9XrX9W3N4mWJOUuAejivJ-E67WL276q6wKuYJ1wFbUIBHIFGgDw/exec';

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
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


