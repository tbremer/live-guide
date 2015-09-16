'use strict';

const evaluateSyntax = (str, syntax) => {
  let _keys = Object.keys(syntax);

  _keys.forEach((k) => {
    let _obj = syntax[k];

    if (!_obj.pattern || (!_obj.task && !_obj.pattern)) { return; }

    if (_obj.filter) {
      str = str.replace(_obj.pattern, _obj.filter);
    }

    if (_obj.task) {
      str = str.replace(_obj.pattern, function(match) {
        let capture = arguments.length > 3 ? [].splice.call(arguments, 1, (arguments.length - 3)) : [];

        return _obj.task.call(null, match, capture);
      });
    }
  });

  return str;
};

module.exports = (arr, syntax) => {
  arr = arr || [];
  syntax = syntax || require('./lib/syntax');
  let str = '';

  if (arr.constructor !== Array) {
    arr = [arr];
  }

  str = arr.join('\n');
  return evaluateSyntax(str, syntax);
};

