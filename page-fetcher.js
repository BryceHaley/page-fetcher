const request = require('request');
const fs = require('fs');

const myArgs = process.argv.slice(2);

const writeToFile = async (path, data) => {
  let filehandle = null;

  try {
    filehandle = await fs.promises.open(path, mode='w')
    await filehandle.writeFile(data)
  } finally {
    if (filehandle) {
      await filehandle.close();
      return data.length;
    }
  }
}

const pageFetcher = function(URL, loc) {
  request(URL, (err, res, body) => {
    if (err) {
      console.log('error:', err); // Print the error if one occurred
    } else {
      console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
      //console.log('body:', body); // Print the HTML for the Google homepage.
      writeToFile(loc, body).then(function(size) {
        console.log(`Downloaded and saved ${size} bytes to ${loc}`);
      });
    }
  });
}

pageFetcher(myArgs[0], myArgs[1]);