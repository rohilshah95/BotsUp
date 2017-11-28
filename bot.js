var session = {
  "scandir": ".analysis/"
}
const ai = require('apiai')(process.env.APIAITOKEN);
const sonar = require("./sonar.js")
const botkit = require('botkit');
const docParser = require('./doc_parse.js');
const download = require('./downloader.js').download;
const snippet = require("./snippetParse.js");

var snippetFlag = false;
var snippetMsg = '';
const controller = botkit.slackbot({
  debug: false
});
var userRuleMap = new Map();

var SevEnum = {
  properties: {
    "BLOCKER": {name: "blocker", value: 1},
    "CRITICAL": {name: "critical", value: 2},
    "MAJOR": {name: "major", value: 3},
    "MINOR": {name: "minor", value: 4},
    "INFO": {name: "info", value: 5}
  }
};

controller.spawn({
  token: process.env.SLACKTOKEN,
  retry: true
}).startRTM();

controller.on('file_share,direct_message,direct_mention', replyCallback);

function replyCallback(bot, message) {
  var user_id = message.user;
  var localSessionId = user_id + getTimeString();
    
    getAIRes({query:cleanString(message.text) , user_id:user_id}).then(function (response) {
        var reply = response.result.fulfillment.speech; // this is a generic response returned by the bot
        var intent = response.result.metadata.intentName; // this resolves the intent name from the response
        var params = response.result.parameters; // this gets the parameters from the response
        var context = response.result.contexts;

        if (message.text.includes("```")) 
        {
            snippetFlag = true;
            snippetMsg = message.text;
            bot.reply(message, "Which language is this?");
        }
        else if(intent === 'SnippetLanguage' && snippetFlag == true)
        {
            snippetFlag = false;
            bot.reply(message, "Please wait while I analyse the snippet");
            snippet.parse(params.Language, snippetMsg, {
                directory: session.scandir + localSessionId,
                session_id: localSessionId
            }).then(sess => sonar.analyse(sess)).then(sess => sonar.getIssues(sess)).then(function (response) {
                var issuesBody = response.body;
                userRuleMap.set(user_id, issuesBody.issues); //storing
                bot.reply(message, formatIssues(issuesBody.issues));

            }).catch(function (err) {
                console.log("Error in process chain " + err)
                bot.reply(message, "Sorry! I don't know how to interpret that");
            });
        }
      else if (intent === 'DefMethod') {
        if (params.method_name) {
          bot.reply(message, reply);
        }
      } else if (intent === 'Language') {
        bot.reply(message, docParser.getDefinition(params.language, context[0].parameters.method_name));

      } else if (intent === 'AllMethods') {
        bot.reply(message, docParser.getDefinition(params.language, params.method_name));

      } else if (intent === 'AnalysisChoice') {
        var url = ""


        if (message.subtype === 'file_share') {
          url = message.file.url_private;
          var options = {
            headers: {
              "Authorization": "Bearer " + process.env.SLACKBEARERTOKEN
            },
          };
        } else if (params.url) {
          options = {};
          url = params.url
        }
        options.directory = session.scandir + localSessionId;
       options.session_id = localSessionId;
        userRuleMap.delete(user_id);
        bot.reply(message, reply);
        processChain(url, options).then(function (response) {
          var issuesBody = response.body;
          userRuleMap.set(user_id, issuesBody.issues); //storing
          bot.reply(message, formatIssues(issuesBody.issues));

        }).catch(function (err) {
          console.error("Error in process chain " + err)
          bot.reply(message, "Sorry! I don't know how to interpret that.");

        });
      } else if (intent === 'AnalysisFeedback' && userRuleMap.get(user_id) != null) { // & the map contains user data
        var ruleName = userRuleMap.get(user_id)[(params.number == "" ? params.ordinal : params.number) - 1].rule;
        sonar.getRules(ruleName).then(function (response) {
          var ruleBody = response.body;
          bot.reply(message, formatRule(ruleBody.rule.htmlDesc));
        })
      } else {
        bot.reply(message, reply)
      }
    }).catch(function (error) {
      console.log(JSON.parse(error.responseBody).status.errorDetails);
      bot.reply(message, JSON.parse(error.responseBody).status.errorDetails)
  })
  }


function getAIRes(inputData) {
  var request = ai.textRequest(inputData.query, {
    sessionId: inputData.user_id
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

function formatIssues(unsortedIssues) {
  issues = sortIssuesSeverity(unsortedIssues);
  if (issues.length == 0) {
    return "I found no issues.";
  }
  var allIssues = "";
  for (var i = 0; i < (issues.length > 10 ? 10 : issues.length); i++) {
      allIssues = allIssues + "_Issue " + (i + 1) + (issues[i].line ? " on line number " + issues[i].line : "") + " in file "+issues[i].component.split(":").pop()+"_: *" + issues[i].message + "*\n";
 
  }
  allIssues=allIssues.concat("\n\n*For more information on issues, reply with issue number*");
  return allIssues;
}

function getTimeString() {
  return new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getTime();
}

function cleanString(text) {
  return text.replace('<', '').replace('>', '');
}

function getIssueCount(issues) {
  var count = 0
  if (!issues || issues.length > 0) {
    count = issues.length;
  }
  return count;
}

function formatRule(ruleStr) {
  return ruleStr.replace(/<em>/g, "*").replace(/<\/em>/g, "*").replace(/<li>/g, "-").replace(/<code>/g, "`").replace(/<\/code>/g, "`").replace(/<\/li>/g, "").replace(/<\/ul>/g, "").replace(/<ul>/g, "").replace(/<h2>/g, "*").replace(/<\/h2>/g, "*").replace(/<pre>/g, "```").replace(/<\/pre>/g, "```").replace(/<p>/g, "\n").replace(/<\/p>/g, "\n");
}

function processChain(url, options) {
  options = options ? options : {};
 // options.directory = session.scandir + session.id;
  //options.session_id = session.id;
  return download(url, options).then(sess => sonar.analyse(sess)).then(sess => sonar.getIssues(sess));
}

function sortIssuesSeverity(issues){

 return issues.sort(function(a,b){
   if (SevEnum.properties[a.severity].value > SevEnum.properties[b.severity].value ){
        return 1;
   }
   else if (SevEnum.properties[a.severity].value < SevEnum.properties[b.severity].value ){
        return -1;
    }
    else {
      return 0;
    }
  });

}