import {readAsync} from './util';
import path from 'path';
import {name as pluginName} from '../package.json';

const register_path = path.resolve(__dirname, "runtime.js");

const loader_path = path.resolve(__dirname, "loader.js");

const cors_sw = async urlreplace => `
(function(){var cors_proxy="${urlreplace}";var global={};${await readAsync(path.join(__dirname, 'cors-sw.js'))};global["${pluginName}"]()})()
`.trim();

class CorsProxyWebpackPlugin {
  constructor(options = {}) {
    this.options = ({...{
      port: 8888,
      host: '127.0.0.1',
      filename: 'cors-sw.js',
    }, ...options});
  }

  apply(compiler) {
    
    addRegisterLoader(compiler, this.options);

    compiler.hooks.emit.tapAsync('CorsProxyWebpackPlugin', async (compilation, callback) => {
      await generateCorsServiceWorker(compilation, this.options);
      callback();
    });
  }

}

function addRegisterLoader(compiler, options) {
  let module = compiler.options.module;
  module.rules.push({
    test: register_path, use: [{
      loader: loader_path,
      options: {
        'sw-path': options.filename, 
      }
    }]
  });
}

async function generateCorsServiceWorker(compilation, options) {
  let content = await cors_sw('http://' + options.host + ':' + options.port);

  compilation.assets[options.filename] = {
    source() {
      return content;
    },
    size() {
      return Buffer.byteLength(content, 'utf8');
    }
  };
}

export {CorsProxyWebpackPlugin};
