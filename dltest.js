var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');

var downloader = require('download-file');

var pDownload= function (url, dest){
  var slug = url.split('.com').pop();
  console.log(slug);
  console.log(dest);
  
  // console.log("done");
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
    console.log("here now");
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

// var testurl = "https://files.slack.com/files-pri/T7JRF8TCN-F7X3R2934/bot.js";

// function download(url) {
//   var options = {
//     directory: ".analysis/" + "3435435435",
//     filename: "test.test",
//     headers: {
//       "Authorization": "Bearer " + process.env.SLACKBEARERTOKEN
//     }
//   };
//   const downloadPromise = new Promise(function (resolve, reject) {
//     downloader(url, options, function (err) {
//       console.log(err);
//       reject(err);
//     });
//     resolve(sessionID);
//   })
//   return downloadPromise;
// }

// download(testurl).then(function(sess){
//   console.log("download")
// })

module.exports.pDownload=pDownload;
//example
// pDownload('https://files.slack.com/files-pri/T7JRF8TCN-F7Y6KEPFZ/bot.js', '.analysis/bot.js')
//   .then( ()=> console.log('downloaded file no issues...'))
//   .catch( e => console.error('error while downloading', e));