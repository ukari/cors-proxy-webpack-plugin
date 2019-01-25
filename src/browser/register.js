let sw_paths = CorsProxyWebpackPluginTemp.paths;

let webpack_config_no_plugin_error = () => {
  throw new Error("cors-proxy-webpack-plugin: if you could see this error, it means your webpack might not be rightly configured with this plugin");
}

function register() {
  if (!sw_paths.length) {
    webpack_config_no_plugin_error();
  }
  !!navigator.serviceWorker && sw_paths.map(path => navigator.serviceWorker.register(path));
  delete window.CorsProxyWebpackPluginTemp;
}

module.exports = register;
