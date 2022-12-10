const { ipToHosting } = require('./src/ip_to_hosting');

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