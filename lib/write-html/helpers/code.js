'use strict';
const Handlebars = require('handlebars');

module.exports = function() {
  Handlebars.registerHelper('code', function() {
    console.log('hello world');
  });
};
