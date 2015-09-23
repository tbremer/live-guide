'use strict';

const fs = require('fs-extra'),
  path = require('path'),
  glob = require('glob'),
  Handlebars = require('handlebars'),
  marked = require('marked');

const loadPartials = function() {
  glob.sync(path.resolve(__dirname, `../../templates/**/*.hbs`)).forEach((partial) => {
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
  let source = fs.readFileSync(options.template || './templates/index.hbs').toString();
  let template = Handlebars.compile(source);

  return new Promise(function(resolve, reject) {
    fs.ensureDir(options.output, function(err) {
      if (err) { return reject(err); }

      styleguideArray.forEach((obj) => {
        const renderer = new marked.Renderer();
        let exampleCount = 0;

        renderer.code = function(snippet, language) {
          let fileName = `${options.output}/${obj.title.replace(/ /g, '_').toLowerCase()}-example-${exampleCount}.html`,
            exampleSource = path.resolve(__dirname, '../../templates/example-code.hbs'),
            source = fs.readFileSync(exampleSource).toString(),
            template = Handlebars.compile(source),
            code = template({snippet: snippet, resources: obj.resources});

          fs.writeFileSync(fileName, code);

          exampleCount++;
          return `<iframe class="code-sample" src="${fileName}"></iframe>\n<code language='${language}'>${snippet}</code>\n`;
        };

        obj.title = obj.title ? obj.title : (obj.fileName.split('/').pop().split('.').shift().replace(/^_/, ''));
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
