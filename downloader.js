var fs = require('fs')
var url = require('url')
var http = require('http')
var https = require('https')
var mkdirp = require('mkdirp')
var path = require('path');

var download = function download(fileUrl, options) {
  if (!fileUrl) throw ("Need a file url to download")
  options.filename = path.basename(fileUrl);
  options.timeout = options.timeout || 20000
  options.directory = options.directory ? options.directory : '.'
  var protocol = url.parse(fileUrl).protocol;
  var req;
  if (protocol === null) {
    fileUrl = 'http://' + fileUrl
    req = http
  } else if (protocol === 'https:') {
    req = https
  } else {
    req = http
  }
  var parsedUrl = url.parse(fileUrl);
  options.path = parsedUrl.path;
  options.hostname = parsedUrl.hostname;

  return new Promise(function (resolve, reject) {
    var responseSent = false;
    var request = req.get(options, function (response) {
      if (responseSent) {
        console.log("Exiting since response was already sent")
        return;
      }
      else if (response.statusCode == 200) {
        console.log("Successful response code, so trying to download")
        mkdirp(options.directory, function (err) {
          if (err) {
            console.log(err)
            reject(err)
          }
          var file = fs.createWriteStream(options.directory + "/" + options.filename);
          response.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              if(responseSent) return;
              responseSent = true;
              console.log("Resolving from downloader " + {session_id : options.session_id, directory: options.directory});
              resolve({session_id : options.session_id, directory: options.directory});
            });
          });
        })
      } else {
        console.log("Reject on invalid status code")
        reject("Invalid status code" + response.statusCode)
      }
      request.setTimeout(options.timeout, function () {
        request.abort()
        reject("Timeout")
      })

    }).on('error', function (err) {
      console.log("Inside on error " + "Response sent?? " + responseSent);
      if (responseSent) return;
      responseSent = true;
      reject(err);
    })
  });
}
module.exports.download = download;