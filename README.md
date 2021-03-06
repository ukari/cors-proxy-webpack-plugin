# cors-proxy-webpack-plugin
This plugin is designed for proxy the cross-domain APIs in the development environment in a dead simple way.

## About
A service worker will hijack all the request in the root scope of web page and pass them to a local proxy provided by this plugin.

```
[before]:
web page   <--blocked by CORS policy-->   cross domain with no 'Access-Control-Allow-Origin'

[after]:
web page   <--hijack-->   service worker   <-->   cors proxy   <-->   cross domain
```

## Install
``` node
npm i -D cors-proxy-webpack-plugin
```

## Usage
Three steps are recommended for config
- webpack, add the plugin to your.webpack.config.js
- browser, add register code to your entry.js
- development environment, add npm script for a easy access

### Step.0 webpack config
``` javascript
{
  plugins: [
    new CorsProxyWebpackPlugin({
      host: "127.0.0.1",
      port: 8888,
      filename: "debug/cors-sw.js"
    })
  ]
}
```

Actually, this plugin could be used with zero options, I show all the possiable options in the example above just for show them.

With zero options
``` javascript
{
  plugins: [
    new CorsProxyWebpackPlugin()
  ]
}
```

### Step1. register the service worker for browser
``` javascript
let register = require('cors-proxy-webpack-plugin/dist/runtime');
register();
```

### Step2. set up the proxy

#### with cli
``` bash
node_modules/.bin/cors-proxy-server --config your.webpack.config.js
```

#### with npm scripts
``` javascript
{
  "cors-proxy": "cors-proxy-server --config your.webpack.config.js"
}
```

It could be used together with `webpack-dev-server` with the help of npm package `concurrently`.
``` javascript
{
  "dev": "concurrently 'webpack-dev-server --config your.webpack.config.js' 'cors-proxy-server --config your.webpack.config.js' "
}
```

## Config
`CorsProxyWebpackPlugin(options)`

- `host` (default `"127.0.0.1"`) type `string`, the hostname of the cros proxy for forwarding requests hijacked by the service worker
- `port` (default `8888`) type `number`, tcp port number, manually specify when a conflict happens
- `filename` (default `"cors-sw.js"`) type `string`, could be a filepath like `xxx/foo.js`, no need to change this until a name confilct happens
