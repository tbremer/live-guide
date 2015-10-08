'use strict';

const filterArray = require('../filter-array');

const filterRawString = function(cssData) {
  const options = this;

  cssData.forEach((obj) => {
    filterArray(obj, options.syntax);
  });

  return cssData;
};

module.exports = filterRawString;

