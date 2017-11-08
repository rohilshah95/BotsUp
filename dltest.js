var https = require('https');
var fs = require('fs');

var pDownload= function (url, dest){
  var slug = url.split('.com').pop();
  console.log(slug);
  var options = {
  "method": "GET",
  "hostname": "files.slack.com",
  "path": slug,
  "rejectUnauthorized": "false",
  "headers": {
      "Authorization": "Bearer " + process.env.SLACKBEARERTOKEN
    }
  }
  var file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    var responseSent = false; // flag to make sure that response is sent only once.

    https.get(options, response => {
      response.pipe(file);
      file.on('finish', () =>{
        file.close(() => {
          //if(responseSent)  return;
          //responseSent = true;
          resolve();
        });
      });
    }).on('error', err => {
        if(responseSent)  return;
        responseSent = true;
        reject(err);
    });
  });
}

module.exports.pDownload=pDownload;
//example
pDownload('https://files-origin.slack.com/files-pri/T7JRF8TCN-F7VMZJK1N/dltest.js', './test/res.new')
  .then( ()=> console.log('downloaded file no issues...'))
  .catch( e => console.error('error while downloading', e));