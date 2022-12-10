# IP to Hosting

This package allows you to check whether an IP address belongs to a hosting/cloud provider. In case the IP belongs to a hosting provider (datacenter), this module will return the meta information for the hosting provider.

## Installation

You can both use this package from Node.js and in the browser with vanilla JavaScript.

```bash
npm install ip-to-hosting
```

If you want to clone the repository directly from GitHub instead:

```bash
git clone git@github.com:ipapi-is/ip_to_hosting.git
```

## Usage from Node.js

If you want to lookup the IP address `144.168.164.55`:

```JavaScript
const { ipToHosting } = require('ip-to-hosting');

const ipAddresses = [
  '144.168.164.55',
  '167.99.241.66',
  '97.107.129.77',
  '85.10.199.76',
];

for (let ip of ipAddresses) {
  ipToHosting(ip).then(function (isHosting) {
    console.log(`${ip} isHosting:`);
    console.log(isHosting);
  });
}
```

which yields:

```text
144.168.164.55 isHosting:
{
  datacenter: 'B2 Net Solutions Inc.',
  domain: 'www.servermania.com',
  network: '144.168.128.0 - 144.168.255.255'
}
97.107.129.77 isHosting:
{
  cidr: '97.107.129.0/24',
  datacenter: 'US-NJ',
  city: 'Cedar Knolls',
  country: 'US'
}
167.99.241.66 isHosting:
{
  cidr: '167.99.240.0/20',
  datacenter: 'DigitalOcean',
  code: '60341',
  city: 'Frankfurt',
  state: 'DE-HE',
  country: 'DE'
}
85.10.199.76 isHosting:
{
  datacenter: 'Hetzner Online AG',
  domain: 'www.hetzner.com',
  network: '85.10.192.0 - 85.10.207.255'
}
```

If the IP address belongs to a datacenter/hosting provider, the API response will return an object with the following required attributes:

- `datacenter` - `string` - to which datacenter the IP address belongs. For a full list of datacenters, check the [ipapi.is/json/info endpoint](https://ipapi.is/json/info). In this case, the datacenter's name is `B2 Net Solutions Inc.`.
- `domain` - `string` - The domain name of the company
- `network` - `string` - the network this IP address belongs to (In the above case: `144.168.128.0 - 144.168.255.255`)

With some datacenter providers, more meta data is available. Consult the [API documentation page](https://ipapi.is/developers.html) in order to learn more.

Most IP's don't belong to a hosting provider. In those cases, the response will be `null`.

## Usage from the Browser

Copy the browser JavaScript bundle to your preferred location. After installing the module with

```bash
npm install ip-to-hosting
```

you can find the minified JavaScript here: `node_modules/ip-to-hosting/dist/ipToHosting.min.js`

```html
<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <title>IP to Hosting Example Browser</title>
  <meta name="description" content="IP to Hosting Example">
  <meta name="author" content="ipapi.is">
</head>

<body>
  <script type="text/javascript" src="dist/ipToHosting.min.js"></script>
  <script type="text/javascript">
    ipToHosting('43.33.44.11').then((res) => {
      alert(`ipToHosting: ${JSON.stringify(res)}`);
    });
  </script>
</body>

</html>
```

## Use the Database Directly

This package uses the [ipapi.is API](https://ipapi.is/developers.html) in order to avoid shipping a huge database in the npm module. If you have a large volume of IP addresses to lookup, you can download the full & free [Hosting Provider Database](https://ipapi.is/hosting-detection.html).

GitHub mirror of the database: [Hosting Provider Database Mirror](https://github.com/ipapi-is/ipapi/tree/main/databases)

## More Examples

Lookup a DigitalOcean IP address `167.99.241.66`

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

Lookup a Linode IP address `97.107.129.77`

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

Lookup a Hetzner IP address `85.10.199.76`

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
