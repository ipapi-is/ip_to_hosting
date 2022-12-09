const { ipToHosting } = require('./src/ip_to_hosting');

(async () => {
  console.log(await ipToHosting('144.168.164.55'));
  console.log(await ipToHosting('167.99.241.66'));
  console.log(await ipToHosting('97.107.129.77'));
  console.log(await ipToHosting('85.10.199.76'));
})();