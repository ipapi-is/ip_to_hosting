# IP to Hosting

This package allows you to check whether an IP address belongs to a hosting provider or not. In case the IP address can be successfully linked to a hosting provider (datacenter), this module will return the meta information for the hosting provider.

If the IP address does not belong to a hosting provider, the response will be `null`.

## Installation

```bash
npm install ip-to-hosting
```

If you want to clone the repository directly from GitHub instead:

```bash
git clone git@github.com:ipapi-is/ip_to_hosting.git
```

## Usage

Lookup the IP address `144.168.164.55`:

```JavaScript
const { ipToHosting } = require('ip-to-hosting');

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

## More Examples

### Lookup a DigitalOcean IP address `167.99.241.66`

```JavaScript
const { ipToHosting } = require('ip-to-hosting');

(async () => {
  console.log(await ipToHosting('167.99.241.66'));
})();
```

```JavaScript
{
  cidr: '167.99.240.0/20',
  datacenter: 'DigitalOcean',
  code: '60341',
  city: 'Frankfurt',
  state: 'DE-HE',
  country: 'DE'
}
```

### Lookup a Linode IP address `97.107.129.77`

```JavaScript
const { ipToHosting } = require('ip-to-hosting');

(async () => {
  console.log(await ipToHosting('97.107.129.77'));
})();
```

```JavaScript
{
  cidr: '97.107.129.0/24',
  datacenter: 'US-NJ',
  city: 'Cedar Knolls',
  country: 'US'
}
```

### Lookup a Hetzner IP address `85.10.199.76`

```JavaScript
const { ipToHosting } = require('ip-to-hosting');

(async () => {
  console.log(await ipToHosting('85.10.199.76'));
})();
```

```JavaScript
{
  datacenter: 'Hetzner Online AG',
  domain: 'www.hetzner.com',
  network: '85.10.192.0 - 85.10.207.255'
}
```
