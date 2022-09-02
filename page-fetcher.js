const request = require('request');

const myArgs = process.argv.slice(2);

const pageFetcher = function(URL, loc) {
  request(URL, (err, res, body) => {
    
  });
}