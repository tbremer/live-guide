'use strict';

const fs = require('fs'),
  path = require('path'),
  syntaxAPI = require(path.resolve(__dirname, '../lib/filter-array/lib/syntax')),
  readmeRegex = /## comments syntax(.|\n)*## TODO/gi;

const syntaxString = function(key, obj) {
  obj.description = obj.description ? `**Description:** ${obj.description}\n` : '';
  obj.notes = obj.notes ? `*${obj.notes}*\n` : '';
  obj.example = obj.example ? `**Example:**\n\`\`\`\n${obj.example.join('\n\n')}\n\`\`\`` : '';

  let retStr = `
#### @${key}
${obj.description}${obj.notes}${obj.example}`;

  return retStr;
};

let readme = fs.readFileSync(path.resolve(__dirname, '../README.md')).toString(),
  syntaxKeys = Object.keys(syntaxAPI);

let apiString = syntaxKeys.map((k) => {
  return syntaxString(k, syntaxAPI[k])
}).join('\n');

readme = readme.replace(readmeRegex, function() {
  const start = '## Comments Syntax\n',
    end = '## Todo';

  return `${start}${apiString}${end}`;
});

fs.writeFileSync(path.resolve(__dirname, '../README.md'), readme);
