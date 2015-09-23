'use strict';

// Node / NPM Modules;
const chalk = require('chalk');

// LOCAL MODULES
const resolveDirs = require('./resolve-dirs'),
  readFiles = require('./read-files'),
  buildTrees = require('./build-trees'),
  filterComments = require('./filter-comments'),
  filterRawString = require('./filter-raw-string'),
  reduceObjects = require('./reduce-objects'),
  copyResources = require('./copy-resources');

const logJson = (data) => {
  console.log(JSON.stringify(data, null, 2));

  return data;
}

const styleguider = (options) => {
  if (!options.input) { throw new Error('You must send styleguider a file or glob pattern'); }

  options.output = options.output || `${process.cwd()}/styleguide`;
  options.resources = options.resources || [];

  resolveDirs(options.input)
  .then(readFiles)
  .then(buildTrees)
  .then(filterComments)
  .then(filterRawString)
  .then(reduceObjects)
  .then(copyResources.bind(options))
  .then(require('./write-html').bind(options))
  //.then(logJson)
  //.then(writeObj)
  .then((data) => {
    //console.log(JSON.stringify(data, null, 2));
    console.log(chalk.green(`We did it!`));
    return data;
  })
  .then(null, (error) => {
    console.log('SOMETHING WENT WRONG');
    console.log(error);
  });
}

module.exports = styleguider;

