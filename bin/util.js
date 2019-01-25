let {name} = require('../package.json');
let weblog = require('webpack-log');

const log = weblog({name: name.split("-").reduce((acc, cur) => acc + cur[0], "")});

module.exports = {
  logger: log,
}
