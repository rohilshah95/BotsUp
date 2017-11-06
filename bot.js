var sonar = require("./sonarRequest.js")
var ai = require('apiai')(process.env.APIAITOKEN);
var botkit = require('botkit');
var download = require('download-file');
var docParser = require('./doc_parse.js');
var docParserPython = require('./doc_parse_python.js');
var controller = botkit.slackbot({ debug: false });

controller.spawn({ token: process.env.GHOSTOKEN, }).startRTM();
controller.on('file_share,direct_message', replyCallback);

var sessionId = "";
function replyCallback(bot, message) {
  console.log(message);
  sessionId = message.user + getTimeString();
  console.log(sessionId);
  if (message.subtype === 'file_share') {
    console.log(message);
    var localUrl = message.file.url_private;;
    //when a file is uploaded, then, let solarqube analyze it, then let the bot reply the issues back.

    tryDownloading(localUrl).then(sonarProcessCallback).then(function () {
      bot.reply("Ok here are the issues");
    });
  }

  //when API.AI reponds, then, let the bot reply with an appropriate message
  getAIRes(message.text).then(function (response) {
    bot.reply(message, prepareReply(response))
  })
}

function prepareReply(response) {
  var reply = response.result.fulfillment.speech; // this is a generic response returned by the bot
  var intent = response.result.metadata.intentName; // this resolves the intent name from the response
  var params = response.result.parameters; // this gets the parameters from the response

  // if (intent === 'Greeting' || intent ==='GenericAnalysis'){
  // return reply;
  // }
  if (intent === 'MethodDef') {
    if (params.methodName) {
      var res = docParser.getMethodDetails(params.methodName);
      var result = res[0].return_type + " " + res[0].method_name + " : " + res[0].description;
      if (res == null || res.length == 0) {
        return "Sorry! I could not find any information related to this";
      }
      return result;
    }
  }
  else if (intent === 'AnalysisChoice') {
    if (params.code_origin) {

    }
    else if (params.url) {
      tryDownloading(params.url.substring(1, params.url.length - 1)).then(sonarProcessCallback).then(function () {
        bot.reply("Ok here are the issues");
      });
    }
  }
  else {
    return reply;
  }
}

function tryDownloading(url) {
  var options = {
    directory: "./test",
    filename: "test.txt"
  };
  const downloadPromise = new Promise(function (resolve, reject) {
    console.log("downloading " + url);
    download(url, options, function (err) {
      console.log(err);
      reject(err);
    });
    resolve();
  })
  return downloadPromise;
}

function getAIRes(query) {
  var request = ai.textRequest(query, {
    sessionId: 'vjjj'
  });
  const responseFromAI = new Promise(
    function (resolve, reject) {
      request.on('error', function (error) {
        reject(error);
      });
      request.on('response', function (response) {
        resolve(response);
      });
    });
  request.end();
  return responseFromAI;
}

function sonarProcessCallback() {

  const responseFromSQ = new Promise(
    function (resolve, reject) {
      // analyze using SQ here
      //callSonarcube here iwth the file path!
      sonar.sendRequest(null, function (map) {

        resolve(formatIssues(sonar.issues.issues));
      })
    });

  return responseFromSQ;
}

function getTimeString() {
  return new Date().getFullYear + new Date().getMonth;
}

function formatIssues(issues) {
  var allIssues = "";
  for (var i = 0; i < issues.length; i++) {
    allIssues = allIssues + "_Issue " + i + "_: *" + issues[i].message + "*\n";
  }
  return allIssues;
}

function getTimeString(){
  return new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getTime();
}