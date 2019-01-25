let http = require('http');
let fetch = require('node-fetch');
let {logger} = require('./util');

let read = req => new Promise((resolve, reject) => {
  let data = "";
  req.on('readable', function() {
    try {
      let chunk = req.read();
      if (chunk != null) {
        data += chunk;
      }
    } catch (e) {
      reject(e)
    }
  });
  req.on('end', function() {
    resolve(data);
  });
});

let reject_service = res => {
  res.writeHead(403, {'Reason': 'This server only serve the cors proxy service'});
  res.end();
}

let proxy = http.createServer(async (req, res) => {
  
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Method': 'POST,OPTIONS',
      'Access-Control-Allow-Origin': '*',
    });
    res.end();
    return;
  }

  if (req.method === "POST") {
    let data = JSON.parse(await read(req));

    if (data.type !== 'cors proxy') {
      reject_service(res);
      return;
    }
    let result;
    try {
      result = await (await fetch(data.payload.url, data.payload)).text();
    } catch(e) {
      reject_service(res);
      return;
    }
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
    });
    res.end(result);
    return;
  }

  reject_service(res);
});

let launch = ({port, host}) =>
    proxy.listen(port, host, () => logger.info(`cors proxy launch on ${host}:${port}`));

module.exports = {launch};
