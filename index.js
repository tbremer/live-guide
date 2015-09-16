var version = parseInt(process.version.replace(/^v/,''), 10);

if (version < 4) {
require('babel-core/register')();
}

module.exports = require('./lib/styleguider');

