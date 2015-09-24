'use strict';

const extractComments = function(styleguideArray) {
  const commentRegex = /(\/\*([\W\w]+)\*\/|\/\/[\W\w]+)/gm;

  styleguideArray.forEach(function(obj) {
    let _str = obj.rawFile,
      _matches = _str.match(commentRegex),
      cleanedMatches = [];

    console.log(`CHECKING ${obj.fileName} FOR COMMENTS`);
    try {
      _matches.forEach((m) => {
        let _tempMatch = m.trim().split('\n');

        _tempMatch = _tempMatch.map((match) => {
          if (match.trim() === "") { return match.trim(); /* if blank line, return */ }

          let _match = match
            .replace(/^\/\*/, '').trim()
            .replace(/^\*\//, '').trim()
            .replace(/^\*/, '').trim()
            .replace(/^([\W\w]+)\*\//, '$1').trim()
            .replace(/^\/\//, '').trim();

          return _match;
        });

        obj.rawComments = obj.filteredComments = _tempMatch.join('\n')
      });
    } catch (e) {
      obj.rawComments = obj.filteredComments = "";
    }
  });

  return styleguideArray;
};

module.exports = extractComments;

