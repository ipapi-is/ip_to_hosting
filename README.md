# IP to Hosting

[![Npm package version](https://badgen.net/npm/v/ip-to-hosting)](https://www.npmjs.com/package/ip-to-hosting)
[![Npm package yearly downloads](https://badgen.net/npm/dy/ip-to-hosting)](https://npmjs.com/package/ip-to-hosting)

This package allows you to check whether an IP address belongs to a hosting/cloud provider. In case the IP belongs to a hosting provider (datacenter), this module will return the meta information for the hosting provider.

Currently, there are more than 180,000 IP ranges from more than 4,400 hosting providers in the database. Learn more, by [reading the documentation](https://ipapi.is/hosting-detection.html).

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

If you want to lookup the following IP addresses:

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

```JavaScript
85.10.199.76 isHosting:
{
  datacenter: 'Hetzner Online GmbH',
  domain: 'www.hetzner.com',
  network: '85.10.192.0 - 85.10.207.255'
}
167.99.241.66 isHosting:
{
  datacenter: 'DigitalOcean',
  code: '60341',
  city: 'Frankfurt',
  state: 'DE-HE',
  country: 'DE',
  network: '167.99.240.0/20'
}
144.168.164.55 isHosting:
{
  datacenter: 'ServerMania Inc.',
  domain: 'https://www.servermania.com/',
  network: '144.168.128.0-144.168.255.255'
}
97.107.129.77 isHosting:
{
  datacenter: 'Linode',
  domain: 'https://www.linode.com/',
  network: '97.107.128.0-97.107.143.255'
}
```

If the IP address belongs to a datacenter/hosting provider, the API response will return an object with the following required attributes:

- `datacenter` - `string` - to which datacenter the IP address belongs. For a full list of datacenters, check the [ipapi.is/json/info endpoint](https://ipapi.is/json/info). In this case, the datacenter's name is `B2 Net Solutions Inc.`
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
  <pre id="hosting"></pre>
  <script type="text/javascript" src="dist/ipToHosting.min.js"></script>
  <script type="text/javascript">
    ipToHosting('43.33.44.11').then((res) => {
      document.getElementById('hosting').innerText = JSON.stringify(res, null, 2);
    });
  </script>
</body>

</html>
```

## Use the Database Directly

This package uses the [ipapi.is API](https://ipapi.is/developers.html) in order to avoid shipping a huge database in the npm module. If you have a large volume of IP addresses to lookup, you can download the full & free [Hosting Provider Database](https://ipapi.is/hosting-detection.html).

GitHub mirror of the database: [Hosting Provider Database Mirror](https://github.com/ipapi-is/ipapi/tree/main/databases)
