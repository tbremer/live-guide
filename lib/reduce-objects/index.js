'use strict';

const reduceObjects = (cssData) => cssData.filter((obj) => (!obj.title || obj.filteredComments.length === 0) ? false : true);

module.exports = reduceObjects;

