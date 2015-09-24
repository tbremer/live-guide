'use strict';

const reduceObjects = (cssData) => cssData.filter((obj) => {
  return  (obj.skipFile === true || (!obj.skipFile && obj.filteredComments.length <= 0)) ? false : true;
})

module.exports = reduceObjects;

