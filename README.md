# ip-to-hosting

[![npm version](https://img.shields.io/npm/v/ip-to-hosting)](https://www.npmjs.com/package/ip-to-hosting)
[![npm downloads](https://img.shields.io/npm/dm/ip-to-hosting)](https://www.npmjs.com/package/ip-to-hosting)

Is this IP address a datacenter? `ip-to-hosting` tells you whether an IPv4 or IPv6 address belongs to a hosting, cloud or CDN provider, and to which one. People browse from home, office and mobile networks; a request from a datacenter is a server talking: a bot, a scraper, a proxy or a VPN.

The answer comes from the [ipapi.is](https://ipapi.is/hosting-detection.html?ref=npm) API, which tracks more than 1.3 million IP ranges of more than 29,000 hosting providers, from AWS, Azure and Google Cloud down to small VPS hosts that publish no range list. No dependencies, Node.js 18 or newer.

```sh
npm install ip-to-hosting
```

You need an API key. A [free account](https://ipapi.is/app/signup?ref=npm) includes 1,000 lookups a day, commercial use allowed. Put the key in the environment as `IPAPI_KEY`.

```js
const { ipToHosting } = require('ip-to-hosting');

await ipToHosting('85.10.199.76');
// { datacenter: 'Hetzner Online GmbH', domain: 'hetzner.com', network: '85.10.192.0 - 85.10.207.255' }

await ipToHosting('3.5.140.2');
// { datacenter: 'Amazon AWS', network: '3.5.140.0/22', region: 'ap-northeast-2', service: 'AMAZON', network_border_group: 'ap-northeast-2' }

await ipToHosting('95.91.211.148'); // a Vodafone customer
// null
```

To pass the key yourself: `ipToHosting(ip, { key })`.

## What you get back

`null` when the address is not a hosting provider's, otherwise an object:

| Field | |
|---|---|
| `datacenter` | The hosting provider |
| `network` | The provider's range that contains the address |
| `domain` | The provider's domain, when known |
| `country`, `state`, `city` | Where the range is, when the provider publishes it |

Large clouds add what they publish about a range: AWS `region`, `service` and `network_border_group`, DigitalOcean and Linode a `city` and `country`. Hosting, cloud and CDN providers, DDoS protection, IP leasing companies and app platforms all count as hosting; the [documentation](https://ipapi.is/developers.html?ref=npm#is_datacenter) has the exact rules.

A failed lookup rejects with an `Error` that carries the HTTP `status` and the API's `error_code` as `code`, for example `ERR_FORBIDDEN_INVALID_API_KEY` or `ERR_QUOTA_EXCEEDED`. Keep the key on your server: a key in browser JavaScript is public.

## Upgrading from 1.x

Since 1 September 2026 the API answers hosting questions only with an API key, so version 1 returns `null` for every address. Version 2 takes the key, and throws when there is none instead of answering "not hosting". Errors now reject instead of resolving to `null`, and the browser bundle in `dist/` is gone, because a key does not belong in a browser.

## More from ipapi.is

- The same lookup also says whether the address is a VPN (and which one), a proxy, a Tor exit or a known abuser, who owns it and where it is: [API documentation](https://ipapi.is/developers.html?ref=npm).
- [ipapi.is-node](https://github.com/NikolaiT/ipapi.is-node): the full response, bulk lookups and an Express middleware that blocks datacenter, VPN, proxy and Tor traffic.
- For lookups without a network call, the [IP to Hosting Database](https://ipapi.is/hosting-detection.html?ref=npm) has every range in CSV and MMDB. [Samples](https://github.com/ipapi-is/ipapi/tree/main/databases).

ISC license.
