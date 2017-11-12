var Botkit = require('botkit');
var request = require('request');
var fs = require("fs");
var wget = require('node-wget');

//npm install download-file --save
var download = require('download-file');


var downloadFile = function (url) {
    var options = {
        directory: "./to_scan_directory",
        filename: "test." + getFileType(url)
    };
    download(url, options, function (err) {
        if (err) throw err
    });
    var fileName = "";
    return fileName;
}

var getFileType = function(url) {
    var fileType = "";
    //check if the url ends with a token or not
    var substring = "?token";
    if (url.indexOf(substring) != -1)
    {
        fileType = url.substring(url.lastIndexOf('.')+1,url.indexOf('?'));
    }
    else
    {
        fileType = url.substring(url.lastIndexOf('.')+1, url.length);
    }
    console.log("Your file type is: " + fileType);
    return fileType;
}
var childProcess = require("child_process");

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

module.exports.downloadFile = downloadFile;
module.exports.getFileType = getFileType;
