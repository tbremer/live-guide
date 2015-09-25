'use strict';

const fs = require('fs-extra'),
  path = require('path'),
  glob = require('glob'),
  Handlebars = require('handlebars'),
  marked = require('marked'),
  highlight = require('highlight.js');

const loadPartials = function() {
  glob.sync(path.resolve(__dirname, `./templates/**/*.hbs`)).forEach((partial) => {
    let name = path.basename(partial).replace(path.extname(partial), ''),
      source = fs.readFileSync(partial).toString();

    Handlebars.registerPartial(name, source);
  });
}();

const loadHelpers = function() {
  glob.sync(`${__dirname}/helpers/**/*.js`).forEach((helper) => {
    require(helper)();
  });
}();

module.exports = function(styleguideArray) {
  let options = this;
  let source = fs.readFileSync(path.resolve(__dirname, `./templates/index.hbs`)).toString();
  let template = Handlebars.compile(source);

  return new Promise(function(resolve, reject) {
    fs.ensureDir(options.output, function(err) {
      if (err) { return reject(err); }

      styleguideArray.forEach((obj) => {
        const renderer = new marked.Renderer();
        let exampleCount = 0;

        renderer.code = function(snippet, language) {
          const frameName = obj.title.replace(/ /g, '_').toLowerCase(),
            frameId = `${frameName}-${exampleCount}`;

          let fileName = `${options.output}/${frameName}-example-${exampleCount}.html`,
            exampleSource = path.resolve(__dirname, './templates/example-code.hbs'),
            source = fs.readFileSync(exampleSource).toString(),
            template = Handlebars.compile(source),
            highlighted = highlight.highlightAuto(snippet).value,
            code = template({
              snippet: snippet,
              resources: obj.resources,
              id: frameId
            });

          fs.writeFileSync(fileName, code);

          exampleCount++;
          return `<iframe class="code-sample" id="${frameId}" src="${fileName}"></iframe>\n<code language='${language}'>${highlighted}</code>\n`;
        };

        obj.options = options;
        obj.resources = options.resources || [];
        obj.parsedHTML = marked(obj.filteredComments, {renderer: renderer});

        let result = template(obj);

        fs.writeFileSync(`${options.output}/${obj.title.replace(/ /g, '_').toLowerCase()}.html`, result);
      });

      return resolve(styleguideArray);
    });
  });
}
