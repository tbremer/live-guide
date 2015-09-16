'use strict';

/**
 * PROCESS ::
 *
 * get files
 * read files
 * build tree
 * get comments
 * parse comments through syntax
 * build objects
 * write pages
 *
 **/
const ast = require('gonzales-pe'),
  fs = require('fs'),
  path = require('path'),
  glob = require('glob'),
  chalk = require('chalk'),
  filterArray = require('./filter-array');

const warn = chalk.yellow.bold;

const globPromise = (path) => {
  return new Promise((resolve, reject) => {
    require('glob')(path, (err, files) => {
      if (err) { return reject(err); }
      return resolve(files);
    });
  });
};

const readFiles = (files) => {
  let filesMap = files.map((f) => {
    return new Promise((resolve, reject) => {
      fs.readFile(f, (err, data) => {
        if (err) {
          console.log(warn(`${f} was unreadable and it is being skipped`));
          return reject(err);
        }

        data = [f, data.toString()];
        return resolve(data);
      })
    });
  });

  return Promise.all(filesMap);
};

const buildTrees = (cssData) => {
  let trees = [];

  cssData.forEach((d) => {
    let extension = path.extname(d[0]).substring(1, d[0].length),
      tree = ast.cssToAST({
      css: d[1],
      syntax: (extension === 'scss' || extension === 'css' ? 'scss' : extension)
    });

    trees.push([d[0], tree]);
  });
  return trees;
}

const filterComments = (cssTrees) => {
  let filtered = [];

  cssTrees.forEach((ctree) => {
    let fileName = ctree[0],
      tree = ctree[1],
      comments = [];

    comments = tree.map((el) => {
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

    filtered.push([fileName, comments]);
  });

  return filtered;
};

const buildObject = () => {};
const writeHTML = () => {};
const writeObj = () => {};

const styleguider = (globPattern, options) => {
  if (!globPattern) { throw new Error('You must send styleguider a file or glob pattern'); }
  options = options || {};

  globPromise(globPattern)
  .then(readFiles)
  .then(buildTrees)
  .then(filterComments)
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
    return data;
  })
  .then(null, (error) => {
    console.log('SOMETHING WENT WRONG');
    console.log(error);
  });
}

module.exports = styleguider;
//let obj = {
//  fileName: fileName,
//  raw: comments.join('\n'),
//  filtered: filterArray(comments)
//};
//
//console.log(obj.filtered);

