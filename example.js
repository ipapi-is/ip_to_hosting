const { ipToHosting } = require('./src/ip_to_hosting');

(async () => {
  console.log(await ipToHosting('144.168.164.55'));
})();