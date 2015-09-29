'use strict';

const reduceObjects = (cssData) => cssData.filter((obj) => {
  if (obj.skipFile === true) { return false; }
  if (!obj.title) { return false; }
  if (obj.filteredComments.length === 0) { return false }

  return true;
})

module.exports = reduceObjects;

