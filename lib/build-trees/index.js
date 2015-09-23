'use strict';

const ast = require('gonzales-pe'),
  path = require('path');

const buildTrees = (cssData) => {
  cssData.forEach((obj) => {
    let extension = path.extname(obj.fileName).substring(1, obj.fileName.length),
      tree = ast.cssToAST({
      css: obj.rawFile,
      syntax: (extension === 'scss' || extension === 'css' ? 'scss' : extension)
    });

    obj.AST = tree;
  });

  return cssData;
}

module.exports = buildTrees;

