const https = require('https');

function ipToHosting(ip) {
  return new Promise(function (resolve) {
    const options = {
      hostname: 'ipapi.is',
      port: 443,
      path: '/json/?q=' + ip,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const req = https.request(options, function (res) {
      res.on('data', function (response) {
        try {
          let parsed = JSON.parse(response);
          if (parsed && parsed.datacenter) {
            resolve(parsed.datacenter);
          }
        } catch (err) { }
        resolve(null);
      });
    });

    req.on('error', function (error) {
      reject(null);
    });

    req.end();
  });
}

exports.ipToHosting = ipToHosting;