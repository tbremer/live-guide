'use strict';

const filterArray = require('../filter-array');

const filterRawString = (cssData) => {
  cssData.forEach((obj) => {
    filterArray(obj);
  });

  return cssData;
};

module.exports = filterRawString;

