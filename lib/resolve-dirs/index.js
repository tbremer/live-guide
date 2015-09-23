'use strict';

const globPromise = (path) => {
  return new Promise((resolve, reject) => {
    require('glob')(path, (err, files) => {
      if (err) { return reject(err); }

      return resolve(files);
    });
  });
};

module.exports = globPromise;

