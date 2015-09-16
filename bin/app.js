#!/usr/bin/env node

var glob = require('glob');
var filePattern = process.argv.slice(2)[0];

require('../index.js')(filePattern);
