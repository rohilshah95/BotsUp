var botkit = require('botkit');
var sonar = require("./sonarRequest.js")
var apiai = require('apiai');
var docParser = require('./doc_parse.js');
var download = require('download-file');
var docParserPython = require('./doc_parse_python.js');

var ai = apiai(process.env.APIAITOKEN);
var controller = botkit.slackbot({  debug: false });
controller.spawn({   token: process.env.GHOSTOKEN, }).startRTM();
controller.on('file_share,direct_message',replyCallback);

var sessionId = "";
function replyCallback(bot, message){
  console.log(message);
sessionId = message.user + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getTime();
console.log(sessionId);
 if (message.subtype ==='file_share'){
   console.log(message);
  var localUrl = message.file.url_private;;
  //localUrl= 'https://raw.githubusercontent.com/CJ8664/html5ever/master/COPYRIGHT';
 tryDownloading(localUrl).then(sonarProcessCallback);
  }
  //when a file is uploaded, then, let solarqube analyze it. Need to chain Promises here.

  //when API.AI reponds, then, let the bot reply with an appropriate message
  getAIRes(message.text).then(function(response){
    bot.reply(message,prepareReply(response))
  })  
}

function prepareReply(response){
  var reply = response.result.fulfillment.speech; // this is a generic response returned by the bot
  var intent = response.result.metadata.intentName; // this resolves the intent name from the response
  var params = response.result.parameters; // this gets the parameters from the response

  if (intent === 'Greeting'){
  return reply;
  }
  else if (intent ==='MethodDef'){
    if(params.methodName){
      var res =  docParser.getMethodDetails(params.methodName);
      var result = res[0].return_type + " " + res[0].method_name + " : " + res[0].description;
      if(res==null || res.length==0)
      {
       return "Sorry! I could not find any information related to this";
      }
      return result;
    }
  }
  else if (intent ==='GenericAnalysis') {
    return reply; 
  }
  else if (intent === 'AnalysisChoice'){
    if(params.code_origin){

    }
    else if (params.url){
      tryDownloading(params.url.substring(1,params.url.length -1)).then(sonarProcessCallback);    
    }
  }
  else {
    return reply;
  }
}

function tryDownloading(url){
    var options = {
        directory: "./test",
        filename: "test.txt"
    };
    const downloadPromise = new Promise(function(resolve,reject){
      console.log("downloading " + url);
      download(url,options,  function (err) {
        console.log(err);
        resolve(err);
      });
    })
    return downloadPromise;
}

function getAIRes(query){
  var request = ai.textRequest(query, {
    sessionId: 'vjjj'
   });
  const responseFromAI = new Promise(
    function(resolve,reject){
    request.on('error',function(error){
      reject(error);
    });
    request.on('response',function(response){
      resolve(response);
    });
  });
  request.end();
return responseFromAI;
}

function sonarProcessCallback(){

  // analyze using SQ here
    //callSonarcube here iwth the file path!
       console.log(sonar.sendRequest);
        sonar.sendRequest(null, function(map){ 
         var issues = sonar.issues.issues;
          var allIssues="";
          for(var i=0;i<issues.length;i++){
            allIssues = allIssues +  "_Issue " + i + "_: *" +  issues[i].message + "*\n";
          }
          console.log(allIssues);
          return allIssues;
        })
}

function getTimeString(){
  return new Date().getFullYear + new Date().getMonth;

}
