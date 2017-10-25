var apiai = require('apiai');

var app = apiai("b9a862255a6a487189b4636e07575b8e");
var Botkit = require('botkit');
var request = require('request');
var fs = require("fs");
var wget = require('node-wget');

//npm install download-file --save
var download = require('download-file');


var downloadFile = function (url) {
    //console.log("in the dowload file function");
    /*
    try
    {
        //var fileName = wget({url: url, dest: "./to_scan_directory"});
        //var fileName = wget(url);
        //console.log(fileName);
    }
    catch(Exception)
    {
        console.log("error in download file function");
    }
    */
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
/*
// connect the bot to a stream of messages
controller.spawn({
  token: process.env.SLACKTOKEN,
}).startRTM()

// give the bot something to listen for.
//controller.hears('string or regex',['direct_message','direct_mention','mention'],function(bot,message) {
controller.hears('raw.github', ['mention', 'direct_mention', 'direct_message'], function (bot, message)
{
    //apiai

    var request = app.textRequest('Github', {
        sessionId: 'uddhav'
    });
    request.on('response', function (response) {
        // console.log(response);
        var reply = response["fulfillment"];
        console.log("printing reply\n\n\n" + response["fulfillment"] + "\n\n\nend of reply");
        bot.reply(message, reply);
    });
    request.on('error', function (error) {
        //console.log(error);
    });

    request.end();
    // end of apiai code

    console.log("printing message after this"); 
    console.log(message);
    console.log("done printing message");
    var url = message.text;
    var urlLength = url.length;
    url = url.substring(1, urlLength - 1);
    console.log(url);
    //downloadFile(url);
    bot.reply(message, "Processing your code :)");
    var fileType = getFileType(url);
    bot.reply(message, "The filetype you uploaded is: " + fileType);
    // process the file in the api. get data
    bot.reply(message, "your file was processed.\nHere are some points...");
  }
);

*/