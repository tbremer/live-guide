'use strict';

const buildNavigation = function(styleguideArray) {
  let options = this,
    _nav = {};

  options.navigation = {};

  styleguideArray.forEach((obj) => {
    let fileName = (obj.writeName || obj.title).replace(/ /g, '_').toLowerCase() + '.html';

    _nav[obj.title] = fileName;
  });

  Object.keys(_nav)
    .sort()
    .forEach(function(v, i) {
      options.navigation[v] = _nav[v];
    });

  return styleguideArray;
};

module.exports = buildNavigation;
