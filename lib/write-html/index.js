'use strict';

const fs = require('fs-extra'),
  path = require('path'),
  glob = require('glob'),
  Handlebars = require('handlebars'),
  chalk = require('chalk'),
  markdownRender = require('../markdown-render');

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
        let markdownTitle = obj.writeName ? obj.writeName : obj.title;
        obj.options = options;
        obj.resources = options.resources || [];
        obj.parsedHTML = markdownRender(obj.filteredComments, obj.resources, markdownTitle, options.output);

        let result = template(obj),
          fileName = (obj.writeName || obj.title).replace(/ /g, '_').toLowerCase();

        fs.writeFileSync(`${options.output}/${fileName}.html`, result);

        console.log(`Writing page: ${chalk.cyan.bold(obj.title)}...`);
      });
      return resolve(styleguideArray);
    });
  });
}
