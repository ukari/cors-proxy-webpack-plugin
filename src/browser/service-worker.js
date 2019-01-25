const disallows = ['signal'];

function install() {
  self.addEventListener('fetch', function(event) {
    let keys = [];
    for (var key in event.request) {
      keys.push(key);
    }

    let copy = keys.filter(key => !disallows.includes(key))
        .filter(key => !(event.request[key] instanceof Function))
        .reduce((acc, cur) => (acc[cur] = event.request[cur], acc), {});

    event.respondWith(fetch(cors_proxy, {
      method:"POST",
      headers: {
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify({payload: copy, type: 'cors proxy'}),
    }));
  });
}

module.exports = install;

