'use strict';

const generateTitles = function(styleguideArray) {

  styleguideArray.forEach((obj) => {
    obj.title = obj.title ? obj.title : (obj.fileName.split('/').pop().split('.').shift().replace(/^_/, ''));
  });

  return styleguideArray;
};

module.exports = generateTitles;
