'use strict';

const fs = require('fs'),
  path = require('path'),
  syntaxAPI = require(path.resolve(__dirname, '../lib/filter-array/lib/syntax')),
  readmeRegex = /##(?:[\sa-z]+)api(.|\n)*?---/gi;

const syntaxString = function(key, obj) {
  let retStr = `
**@${key}**: ${obj.description}

**pattern**: \`${obj.pattern}\`
`;

  return retStr;
};

let readme = fs.readFileSync(path.resolve(__dirname, '../README.md')).toString(),
  syntaxKeys = Object.keys(syntaxAPI);

let apiString = syntaxKeys.map((k) => {
  return syntaxString(k, syntaxAPI[k])
}).join('\n');

readme = readme.replace(readmeRegex, `## Module API\n${apiString}\n\n---`);

fs.writeFileSync(path.resolve(__dirname, '../README.md'), readme);
