'use strict';

const Handlebars = require('handlebars'),
  exists = require('fs-extra').existsSync,
  path = require('path');

module.exports = function() {
  Handlebars.registerHelper('resource', function(file) {
    let extension = path.extname(file).replace('.', '');

    if (extension === 'css') {
      return new Handlebars.SafeString(`<link href="${file}" rel="stylesheet">`);
    }

    if (extension === 'js') {
      return new Handlebars.SafeString(`<script src="${file}"></script>`);
    }

    return '';
  });
};
