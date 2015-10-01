'use strict';

const marked = require('marked'),
  highlight = require('highlight.js'),
  Handlebars = require('handlebars'),
  path = require('path'),
  fs = require('fs');

module.exports = function(markdownString, resources, title, output) {
  resources = resources || [],
  title = title || '';

  let modifiedRenderer = new marked.Renderer(),
    exampleCount = 0;

  modifiedRenderer.code = function(snippet, language) {
    const frameName = title.replace(/ /g, '_').toLowerCase(),
      frameId = `${frameName}-${exampleCount}`;

    let fileName = `${frameName}-example-${exampleCount}.html`,
      exampleSource = path.resolve(__dirname, '../write-html/templates/example-code.hbs'),
      source = fs.readFileSync(exampleSource).toString(),
      template = Handlebars.compile(source),
      highlighted = highlight.highlightAuto(snippet).value,
      code = template({
       snippet: snippet,
       resources: resources,
       id: frameId
     }),
     returnString = `<section class="code-block cf">
        <iframe class="code-sample" id="${frameId}" src="${fileName}"></iframe>
        <code language='${language}' class="hljs" >${highlighted}</code>
      </section>`;

    fs.writeFileSync(`${output}/${fileName}`, code);
    exampleCount++;
    return returnString;
  };

  return marked(markdownString, {renderer: modifiedRenderer});
};

