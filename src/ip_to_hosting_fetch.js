function ipToHosting(ip) {
  return new Promise(function (resolve) {
    fetch(`https://api.ipapi.is/?q=${ip}`)
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