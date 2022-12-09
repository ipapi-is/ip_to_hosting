# IP to Hosting

This package allows you to check whether an IP address belongs to a hosting provider. In case the IP address can be successfully linked to a hosting provider (datacenter), this module will return the meta information for the hosting provider.

## Installation

```bash
npm install ip-to-hosting
```

If you want to clone the repository directly from GitHub instead:

```bash
git clone git@github.com:ipapi-is/ip_to_asn.git
```

## Usage

Lookup the IP address `144.168.164.55`:

```JavaScript
const { ipToHosting } = require('./src/ip_to_hosting');

(async () => {
  console.log(await ipToHosting('144.168.164.55'));
})();
```

which outputs (at the time of writing):

```JavaScript
{
  datacenter: 'B2 Net Solutions Inc.',
  domain: 'www.servermania.com',
  network: '144.168.128.0 - 144.168.255.255'
}
```

If the IP address belongs to a datacenter/hosting provider, the API response will return an object with the following attributes:

- `datacenter` - `string` - to which datacenter the IP address belongs. For a full list of datacenters, check the [ipapi.is/json/info endpoint](https://ipapi.is/json/info). In this case, the datacenter's name is `B2 Net Solutions Inc.`.
- `domain` - `string` - The domain name of the company
- `network` - `string` - the network this IP address belongs to (In the above case: `144.168.128.0 - 144.168.255.255`)

Most IP's don't belong to a hosting provider. In those cases, the response will be `null`.
