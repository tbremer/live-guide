'use strict';

const fs = require('fs-extra'),
  path = require('path');

const copyPromise = function(file) {
  let options = this;
  fs.ensureDirSync(`${options.output}/resources/`);

  return new Promise(function(resolve, reject) {
    let fileName = path.basename(file),
      copyPath = `${options.output}/resources/${fileName}`;

    fs.copy(file, copyPath, {clobber: true}, function(err) {
      if (err) { resolve(undefined); }

      resolve(copyPath);
    });
  });
};

const copyResources = function(cssObj) {
  let options = this,
    allCopies = options.resources.map((r) => fs.existsSync(r) ? r : undefined).filter((r) => r !== undefined);

  console.log('Copying Resources...');

  allCopies = allCopies.map((r) => {
    return copyPromise.call(options, r);
  });

  return  Promise.all(allCopies)
  .then(function(files) {
    files = files.map((f) => f.replace(options.output, '').replace(/^\//, ''));
    options.resources = files;
    return Promise.resolve(cssObj);
  });
};

module.exports = copyResources;
