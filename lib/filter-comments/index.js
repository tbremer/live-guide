'use strict';

const filterComments = (cssData) => {
  cssData.forEach((obj) => {
    obj.rawComments = obj.AST.map((el) => {
      if (/commentSL|commentML/.test(el[0])) {
        if (el[0] === 'commentSL') {
          el[1] = el[1].replace(/^\/*[\s]*/, '');
        } else {
          el[1] = el[1].split('\n')
          el[1].forEach((el, idx, arr) => {
            arr[idx] = el.replace(/^[\s]*\**[\s]*/, '');
          })
          el[1] = el[1].join('\n');
        }

        return el[1];
      }
    }).filter((el) => (el !== undefined));

    obj.rawComments = obj.filteredComments = obj.rawComments.join('\n');
  });

  return cssData;
};

module.exports = filterComments;

