#!/usr/bin/env node

let {launch} = require('./cors-proxy-server');
let program = require('commander');
let {version} = require('../package.json');
let {CorsProxyWebpackPlugin} = require('../dist/main');
let path = require('path');
let {logger} = require('./util');

let launcher = (filename) => {
  let config = require(path.join(process.cwd(), filename));
  let instances = config.plugins.filter(plugin => plugin instanceof CorsProxyWebpackPlugin);
  logger.info("the number of detected instances of CorsProxyWebpackPlugin is: " + instances.length);
  instances.map(plugin => launch(plugin.options));
};

program
  .version(version, '-v, --version')
  .usage('[options] [value ...]')
  .option('-c, --config [filename]', 'run the cors proxy server with webpack config file', launcher)
  .parse(process.argv);
