var fs = require('fs')
var url = require('url')
var http = require('http')
var https = require('https')
var mkdirp = require('mkdirp')

module.exports = function download(fileURL, options, callback) {
  if (!fileURL) throw("Need a file url to download")

  if (!callback && typeof options === 'function') {
    callback = options
  }
  options = typeof options === 'object' ? options : {}
  options.timeout = options.timeout || 20000
  options.directory = options.directory ? options.directory : '.'
  var uri =fileURL.split('/')
  options.filename = options.filename || uri[uri.length - 1]
  var path = options.directory + "/" + options.filename
  options.hostname = url.parse(fileURL).hostname;
  options.path = url.parse(fileURL).path;
  if (url.parse(fileURL).protocol === null) {
    fileURL = 'http://' + fileURL
    req = http
  } else if (url.parse(fileURL).protocol === 'https:') {
    req = https
  } else {
    req = http
  }
  var responseSent = false;
  var request = req.get(options, function(response) {

    if (response.statusCode) {

      mkdirp(options.directory, function(err) { 
        if (err) throw err
        var file = fs.createWriteStream(path);
        response.pipe(file);
        file.on('finish', () =>{
          file.close(() => {
            if(responseSent)  return;
            responseSent = true;
          });
        });
      })

    } else {
      if (callback) callback(response.statusCode)
    }
    response.on("end", function(){
      if (callback) callback(false, path)
    })

    request.setTimeout(options.timeout, function () {
      request.abort()
      callback("Timeout")
    })

  }).on('error', function(e) {
    if(responseSent)  return;
    responseSent = true;
    if (callback) callback(e)

  })

}
