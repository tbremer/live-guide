#!/usr/bin/env node

var cliOptions = require('yargs')
  .usage('styleguider --input **/*.css [options]')
  .alias('input', 'i')
  .describe('input', 'file(s) (glob pattern) that should be evaulated and built into the Styleguide')
  .alias('output', 'o')
  .describe('output', 'Where should the output styleguide go? Defaults to current working directory /styleguide')
  .alias('resource', 'r')
  .describe('resource', 'additional resources to be loaded into the code example iframes')
  .alias('name', 'n')
  .describe('name', 'name for the style guide or product')
  //.alias('c', 'config')
  //.alias('t', 'template')
  .alias('help', 'h')
  .describe('help', 'Show this Dialog')
  .array('resource')
  .demand('input')
  .help('h')
  .argv;

var options = {
  input: cliOptions.input,
  output: cliOptions.output || undefined,
  resources: cliOptions.resource || [],
  name: cliOptions.name || 'Styleguide'
}

require('../index.js')(options);
