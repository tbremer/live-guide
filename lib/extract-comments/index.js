'use strict';

const extractComments = function(str) {
  const commentRegex = /(?:\/\*\*([^])+?)\*\/|(?:\/\/(.*))/g;
  let matches = str.match(commentRegex);

  if (matches === null) { return ''; }

  matches = matches.map((m) => {
    let _tempMatch = m.trim().split('\n');

    _tempMatch = _tempMatch.map((match) => {
      match = match.trim();
      if (match === '') { return match; } // return if there are no matches;

      return match
        .replace(/^\/\*|\*\//, '').trim()
        .replace(/^\*/, '').trim()
        .replace(/^([\W\w]+)\*\//, '$1').trim()
        .replace(/^\/\//, '').trim();
    });

return _tempMatch.join('\n');
  });

  return matches.join('\n');
};

module.exports = function(sgArray) {
  sgArray.forEach((obj) => {
    let _str = obj.rawFile;

    obj.rawComments = obj.filteredComments = extractComments(_str);
  });

  return sgArray;
};

