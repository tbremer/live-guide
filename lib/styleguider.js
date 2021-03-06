'use strict';

// Node / NPM Modules;
const chalk = require('chalk'),
  path = require('path');

// LOCAL MODULES
const resolveDirs = require('./resolve-dirs'),
  readFiles = require('./read-files'),
  extractComments = require('./extract-comments'),
  filterRawString = require('./filter-raw-string'),
  reduceObjects = require('./reduce-objects'),
  copyResources = require('./copy-resources'),
  buildNavigation = require('./build-navigation'),
  writeHTML = require('./write-html'),
  copyAssets = require('./copy-assets');

const logJson = (data) => {
  console.log(JSON.stringify(data, null, 2));

  return data;
}

const styleguider = (options) => {
  if (!options.input) { throw new Error('You must send styleguider a file or glob pattern'); }

  options.output = options.output || `${process.cwd()}/styleguide`;
  options.resources = options.resources || [];
  options.syntax = options.syntax ? require(path.relative(__dirname, options.syntax)) : {};

  console.log();

  return Promise.resolve(resolveDirs(options.input))
  .then((files) => {
    let idx = files.indexOf(options.input);
    if (idx !== -1) {
      files.splice(idx, 1);
    }

    return files;
  })
  .then(readFiles)
  .then(extractComments)
  .then(filterRawString.bind(options))
  .then(reduceObjects)
  .then(copyResources.bind(options))
  .then(copyAssets.bind(options))
  .then(buildNavigation.bind(options))
  .then(writeHTML.bind(options))
  .then((data) => {
    console.log(chalk.green(`We did it!`));
  })
  .then(null, (error) => {
    console.log();
    console.log(chalk.bold.red('SOMETHING WENT WRONG'));
    console.log(error);
  });
}

module.exports = styleguider;
