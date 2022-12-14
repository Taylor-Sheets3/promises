/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluck = require('./promiseConstructor.js');
var promisification = require('./promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  const writeProf = new Promise ((resolve, reject) => {
    pluck.pluckFirstLineFromFileAsync(readFilePath)
      .then((firstLine) => promisification.getGitHubProfileAsync(firstLine))
      .then((body) => {
        let stringBody = JSON.stringify(body);
        fs.writeFile(writeFilePath, stringBody, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(stringBody);
          }
        });
      });
  });
  return writeProf;
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};