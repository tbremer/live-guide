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

    snippet = snippet.replace(/\\n/g, '');

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
        <button class="btn js-showsource">
          <svg viewbox="0 0 32 22" class="icon eye">
            <polygon points="0,11 9,2.5 9,19.5" class="lid-shape left" />
            <polygon points="32,11 23,2.5 23,19.5" class="lid-shape right" />

            <circle r="9" cy="11" cx="16" stroke-width="4" class="outer-eye" />
            <circle r="2" cy="11" cx="16" class="inner-eye" />
          </svg>
          show source
        </button>
        <code language='${language}' class="hljs hidden ${language === 'html' || language === 'markup' ? 'xml' : language}" >${highlighted}</code>
      </section>`;

    fs.writeFileSync(`${output}/${fileName}`, code);
    exampleCount++;
    return returnString;
  };

  return marked(markdownString, {renderer: modifiedRenderer});
};

