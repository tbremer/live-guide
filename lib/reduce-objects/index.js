'use strict';

const reduceObjects = (cssData) => cssData.filter((obj) => (obj.skipFile === true || obj.filteredComments.length <= 0) ? false : true)

module.exports = reduceObjects;

