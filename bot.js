var ai = require('apiai')(process.env.APIAITOKEN);
var sonar = require("./sonar.js")
var botkit = require('botkit');
var docParser = require('./doc_parse.js');
var downloader = require('download-file');
var docParserPython = require('./doc_parse_python.js');
var controller = botkit.slackbot({ debug: false });
var testdl = require('./dltest.js');
var path = require('path');
var mkdirp = require('mkdirp');

controller.spawn({ token: process.env.SLACKTOKEN, }).startRTM();
var session;

controller.on('file_share,direct_message,direct_mention', replyCallback);
var sessionID = "";

function replyCallback(bot, message) {
  session = { "user_id": message.user, "session_id": message.user + getTimeString() }
  sessionID = session.session_id;
  //console.log(message);
  if (message.subtype === 'file_share') {
    var localUrl = message.file.url_private;
    var dest='.analysis/' + sessionID;
    mkdirp(dest, function(err) {

    testdl.pDownload(localUrl, (dest+"/"+path.basename(localUrl))).then(function (sess) { return sonar.analyse(sess) }).then(function (sess) { return sonar.getIssues(sess) }).then(function (body) {
      // bot.reply(message, "I found " + getIssueCount(body.issues) + " issues");
          //if (getIssueCount(body.issues) > 0) {
            console.log(body.issues);
            bot.reply(message, formatIssues(body.issues));
          //}
    });

    });
    //when a file is uploaded, then, let solarqube analyze it, then let the bot reply the issues back.

  }
  // block for analyzing code snippets
  // if message.sbutype = snippet?
  // then use the promise callbacks to process
  getAIRes(cleanString(message.text)).then(function (response) {
    var reply = response.result.fulfillment.speech; // this is a generic response returned by the bot
    var intent = response.result.metadata.intentName; // this resolves the intent name from the response
    var params = response.result.parameters; // this gets the parameters from the response

    if (intent === 'MethodDef') {
      if (params.methodName) {
        var res = docParser.getMethodDetails(params.methodName);
        var result = res[0].return_type + " " + res[0].method_name + " : " + res[0].description;

        if (res == null || res.length == 0) {
          result = "Sorry! I could not find any information related to this";
        }
        bot.reply(message, result)
      }
    }
    else if (intent === 'AnalysisChoice') {
      bot.reply(message, reply);
      if (params.url) {
        download(params.url).then(function (sess) { return sonar.analyse(sess) }).then(function (sess) { return sonar.getIssues(sess) }).then(function (body) {
         // bot.reply(message, "I found " + getIssueCount(body.issues) + " issues");
          //if (getIssueCount(body.issues) > 0) {
            console.log(body.issues);
            bot.reply(message, formatIssues(body.issues));
          //}
        });
      }
    }
    else if (intent === 'AnalysisFeedback') {

    }
    else {
      bot.reply(message, reply)
    }
  })
}
function download(url) {
  var options = {
    directory: ".analysis/" + sessionID,
    filename: path.basename(url)
  };
  const downloadPromise = new Promise(function (resolve, reject) {
    downloader(url, options, function (err) {
      console.log(err);
      reject(err);
    });
    resolve(sessionID);
  })
  return downloadPromise;
}

function getAIRes(query) {
  var request = ai.textRequest(query, {
    sessionId: session.user_id
  });
  const responseFromAI = new Promise(
    function (resolve, reject) {
      request.on('error', function (error) {
        reject(error);
      });
      request.on('response', function (response) {
        resolve(response);
      });
    }).catch(() => { });
  request.end();
  return responseFromAI;
}

function formatIssues(issues) {
  var allIssues = "";
  for (var i = 0; i < (issues.length > 10 ? 10 : issues.length); i++) {
    allIssues = allIssues + "_Issue " + (i + 1) + (issues[i].line?" on line number "+issues[i].line:"")+"_: *" + issues[i].message + "*\n";
  }
  return allIssues;
}

function getTimeString() {
  return new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getTime();
}

function cleanString(text) {
  return text.replace('<', '').replace('>', '');
}

function getIssueCount(issues) {
  console.log(issues.length);
  var count = 0
  if (!issues || issues.length > 0) {
    count = issues.length;
  }
  return count;
}
