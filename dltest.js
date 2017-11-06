var https = require('https');
var fs = require('fs');

var options = {
  "method": "GET",
  "hostname": "files.slack.com",
  "path": "/files-pri/T7UC4HMQE-F7VG3KWMT/download/results.xlsx",
  "rejectUnauthorized": "false",
  "headers": {
      "Authorization": "Bearer xoxp-266412599830-264876024624-264878848720-1b5c99f3a717478de45c6149466afb9e"
  }
}

function pDownload(url, dest){
  var file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    var responseSent = false; // flag to make sure that response is sent only once.

    https.get(options, response => {
      response.pipe(file);
      file.on('finish', () =>{
        file.close(() => {
          if(responseSent)  return;
          responseSent = true;
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

//example
pDownload('https://files.slack.com/files-pri/T7UC4HMQE-F7VG3KWMT/download/results.xlsx', './test/res.new')
  .then( ()=> console.log('downloaded file no issues...'))
  .catch( e => console.error('error while downloading', e));