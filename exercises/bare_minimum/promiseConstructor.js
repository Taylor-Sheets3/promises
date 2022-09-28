/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  const getFirstLine = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, text) => {
      if (err) {
        reject(err);
      } else {
        let firstLine = text.toString().split('\n')[0];
        resolve (firstLine);
      }
    });
  });
  return getFirstLine;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  const getStatusCode = new Promise ((resolve, reject) => {
    request.get(url, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    });
  });
  return getStatusCode;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
