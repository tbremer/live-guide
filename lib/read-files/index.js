'use strict';
const fs = require('fs-extra'),
  chalk = require('chalk');

const warn = chalk.bold.yellow;

const readFiles = (files) => {
  console.log('Reading files...');
  let filesMap = files.map((f) => {
    return new Promise((resolve, reject) => {
      fs.readFile(f, (err, data) => {
        if (err) {
          console.log(warn(`${f} was unreadable and it is being skipped`));
          return reject(err);
        }

        data = {
          fileName: f,
          rawFile: data.toString()
        };

        return resolve(data);
      })
    });
  });

  return Promise.all(filesMap);
};

module.exports = readFiles;

