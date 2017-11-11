var fs = require('fs')
var url = require('url')
var http = require('http')
var https = require('https')
var mkdirp = require('mkdirp')
var path = require('path');
var decompress = require('decompress');
const extName = require('ext-name');

function download(fileUrl, options) {
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
  const downloadPromise = new Promise(function (resolve, reject) {
    var extract = false;
    var responseSent = false;
    var request = req.get(options, function (response) {
      extract = getExtFromMime(response) === 'zip'
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
              if (responseSent) return;

              if (extract) {
                console.log()
                decompress(options.directory + "/" + options.filename, options.directory).then(() => {
                  resolve({ session_id: options.session_id, directory: options.directory });
                });
              }
              else {
                responseSent = true;
                console.log("Resolving from downloader " + { session_id: options.session_id, directory: options.directory });
                resolve({ session_id: options.session_id, directory: options.directory });
              }
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


  return downloadPromise
}

function getExtFromMime(res) {
  const header = res.headers['content-type'];
  console.log(header);
  if (!header) {
    console.log("Not header")
    return null;
  }
  const exts = extName.mime(header);
  if (exts.length !== 1) {
    console.log("length not 1")
    return null;
  }
  return exts[0].ext;
};

module.exports.download = download;