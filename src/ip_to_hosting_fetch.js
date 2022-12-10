function ipToHosting(ip) {
  return new Promise(function (resolve) {
    fetch(`https://ipapi.is/json/?q=${ip}`)
      .then(res => res.json())
      .then(function (parsed) {
        try {
          if (parsed && parsed.datacenter) {
            resolve(parsed.datacenter);
          }
        } catch (err) { }
        resolve(null);
      });
  });
}