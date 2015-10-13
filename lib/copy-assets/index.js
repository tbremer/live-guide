'use strict';

const fs = require('fs-extra'),
  path = require('path'),
  concat = require('concat'),
  glob = require('../resolve-dirs');

let assets = {
  css: [
    path.resolve(__dirname, '../../node_modules/normalize.css/normalize.css'),
    path.resolve(__dirname, '../../node_modules/highlight.js/styles/github.css'),
    path.resolve(__dirname, '../../assets/css/dist/app.css')
  ],
  js: [
    path.resolve(__dirname, '../../assets/**/*.js')
  ]
};

const concatAssets = function(assetArray, destination) {
  return new Promise(function(resolve, reject) {
    let ext = path.extname(assetArray[0]).replace(/^\./, ''),
      fileName = `${destination}/app.${ext}`;

    concat(assetArray, fileName, function(err) {
      if (err) { reject(err); }

      resolve();
    });
  });
};

const copyAssets = function(styleguideArray) {
  let options = this,
    assetsDir = `${options.output}/assets`;

  fs.ensureDirSync(assetsDir);

  let assetMess = [
    Promise.all(assets.css.map((c) => glob(c))).then((f) => [].concat.apply([], f)),
    Promise.all(assets.js.map((j) => glob(j))).then((f) => [].concat.apply([], f))
  ];

  return Promise.all(assetMess)
    .then(function(files) {
      return Promise.all(files.map((f) => concatAssets(f, assetsDir)))
    })
    .then(function(data) {
      return Promise.resolve(styleguideArray);
    })
    .then(null, function(error) {
      return Promise.reject(error);
    })

};

module.exports = copyAssets;
