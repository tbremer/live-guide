'use strict';

const path = require('path');

const buildNavigation = function(styleguideArray) {
  let options = this;

  options.navigation = {};

  styleguideArray.forEach((obj) => {
    let fileName = `${obj.title.replace(/ /g, '_').toLowerCase()}.html`;

    options.navigation[obj.title] = fileName;
  });

  return styleguideArray;
};

module.exports = buildNavigation;
