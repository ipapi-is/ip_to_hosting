'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { ipToHosting } = require('.');

delete process.env.IPAPI_KEY;

// Stands in for the API: records the request, answers with `body`.
function stubFetch(body, status = 200) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url, ...init });
    return { ok: status < 400, status, json: async () => body };
  };
  return calls;
}

const datacenter = { datacenter: 'Hetzner Online GmbH', domain: 'hetzner.com', network: '85.10.192.0 - 85.10.207.255' };

test('a hosting address: the datacenter object, the key in the POST body and not in the URL', async () => {
  const calls = stubFetch({ ip: '85.10.199.76', is_datacenter: true, datacenter });
  assert.deepStrictEqual(await ipToHosting('85.10.199.76', { key: 'k' }), datacenter);
  assert.strictEqual(calls[0].url, 'https://api.ipapi.is/');
  assert.deepStrictEqual(JSON.parse(calls[0].body), { q: '85.10.199.76', key: 'k' });
});

test('the key is read from IPAPI_KEY', async (t) => {
  process.env.IPAPI_KEY = 'from-env';
  t.after(() => delete process.env.IPAPI_KEY);
  const calls = stubFetch({ is_datacenter: true, datacenter });
  await ipToHosting('85.10.199.76');
  assert.strictEqual(JSON.parse(calls[0].body).key, 'from-env');
});

test('null for an address that is not a hosting provider\'s', async () => {
  stubFetch({ ip: '95.91.211.148', is_datacenter: false });
  assert.strictEqual(await ipToHosting('95.91.211.148', { key: 'k' }), null);
});

test('without a key it throws instead of answering "not hosting", and asks nothing', async () => {
  const calls = stubFetch({});
  await assert.rejects(ipToHosting('85.10.199.76'), /no API key/);
  assert.strictEqual(calls.length, 0);
});

test('an API error rejects with its status and error_code', async () => {
  stubFetch({ error: 'Invalid API key', error_code: 'ERR_FORBIDDEN_INVALID_API_KEY' }, 403);
  await assert.rejects(ipToHosting('1.1.1.1', { key: 'bad' }), { status: 403, code: 'ERR_FORBIDDEN_INVALID_API_KEY' });
});
