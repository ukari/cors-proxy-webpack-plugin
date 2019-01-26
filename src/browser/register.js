try {
  CorsProxyWebpackPluginTemp;
} catch(e) {
  CorsProxyWebpackPluginTemp = {paths: []};
}

let sw_paths = CorsProxyWebpackPluginTemp.paths;

let error = message => () => {
  console.error(`cors-proxy-webpack-plugin:  if you could see this error, it means ${message}`)
};

function register() {
  if (!sw_paths.length) {
    error("your webpack might not be rightly configured with this plugin.");
  }
  if (!!navigator.serviceWorker) {
    sw_paths.map(path => navigator.serviceWorker.register(path).catch(e => {
      console.error(e);
      error("service worker registration failed.");
    }));
  } else {
    error('service workers are not supported.');
  }
  delete window.CorsProxyWebpackPluginTemp;
}

module.exports = register;
