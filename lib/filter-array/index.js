'use strict';

const deepMerge = require('deepmerge');

const filterComments = (obj, syntax) => {
  syntax = deepMerge(require('./lib/syntax'), syntax);

  let keys = Object.keys(syntax);

  keys.forEach((k) => {
    const _syntax = syntax[k];

    if (!_syntax.pattern) { return; }

    if (_syntax.filter) {
      obj.filteredComments = obj.filteredComments.replace(_syntax.pattern, _syntax.filter);
    }

    if (_syntax.task) {
      _syntax.task(obj);
    }
  });

  return obj;
};

module.exports = filterComments;

