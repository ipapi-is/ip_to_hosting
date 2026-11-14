'use strict';

// ip-to-hosting: whether an IP address belongs to a hosting provider, and to
// which one, from the ipapi.is API (https://ipapi.is/developers.html).
// Node.js 18+.

const API = 'https://api.ipapi.is/';

/**
 * The hosting provider `ip` belongs to, as the API's `datacenter` object, or
 * null when it is not a hosting address. Needs an API key (`options.key` or
 * the environment variable IPAPI_KEY): without one the API does not say.
 */
async function ipToHosting(ip, options = {}) {
  const key = options.key !== undefined ? options.key : process.env.IPAPI_KEY;
  if (!key) {
    throw new Error('ip-to-hosting: no API key. Pass { key } or set IPAPI_KEY. '
      + 'A free key with 1,000 lookups a day: https://ipapi.is/app/signup?ref=npm');
  }
  // The key goes in the body: a URL ends up in logs.
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ q: ip, key }),
    signal: AbortSignal.timeout(5000),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || data.error) {
    const err = new Error(`ipapi.is: ${(data && data.error) || `HTTP ${res.status}`}`);
    err.status = res.status;
    err.code = data && data.error_code;
    throw err;
  }
  return data.datacenter || null;
}

module.exports = { ipToHosting };
