var son=require('./sonarRunner.js');
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);
var download=require('download-file');
var https = require('https');
var fs = require('fs');
var downloader=require('../testingdownload.js');
console.log(typeof downloader.pDownload);
var sonar=require('../sonarRequest.js');

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.SLACKTOKEN,
}).startRTM()

// give the bot something to listen for.

controller.hears('hi','direct_mention,direct_message', function(bot, message) {

  bot.startConversation(message, function(err, convo) {
    convo.say('Hi, I\'m your new personal tutor!');
    convo.ask('Do you want to upload the code or share github link?', function(answer, convo) {
      console.log(answer);
      var type = answer.text;
      console.log(type);
      console.log(type.includes("code"));
      if(type.includes("github")){
      	convo.ask('Please provide the link to the raw file.', function(answer1, convo){
      		var gitLink=answer1.text;
      		if(gitLink.includes("goodbye")|| gitLink.includes("bye"))
		    {
		    	convo.next();
		    	convo.say("Good Bye!");
		      	return;
		    }
      		gitLink=gitLink.substring(1,(gitLink.length-1));
      		convo.next();
      		convo.say('great');
      		console.log("Github link is: "+gitLink);
      	});
      }
      else if(type.includes("code") || type.includes("file") || type.includes("upload"))
      {
      	convo.ask('Please upload the code file', function(answer2, convo){
      		console.log(answer2);

      		
      		if(typeof answer2.file=='undefined')
      		{
      			//var private=answer2.file.url_private_download;

      			convo.next();
		      	convo.say("Sorry I dont follow, exiting, try again from the start");
		      	return;
      		}
      		var private=answer2.file.url_private_download;
      		var slug = private.split('.com').pop();
      		console.log(slug);

      		var permalink=answer2.file.permalink;
      		var options = {
			  "method": "GET",
			  "hostname": "files.slack.com",
			  "path": slug,
			  "rejectUnauthorized": "true",
			  "headers": {
			      "Authorization": "Bearer xoxp-256865299430-256034721060-256170554661-e9e93acfc3251d0d547cc9ca00ef1a38"
			  }
			}
			downloader.pDownload(slug,permalink,"C:/Users/rgsha/Documents/Projects/SE/SlackBot/to_scan_directory/test.java");
      son.run();
			/*sonar.sendRequest("", function(map){
        // Uncomment the two lines below and comment third line for actual Sonarqube output
         //console.log("Actual Output from Sonarqube");
         //console.log(issues);
         console.log(sonar.issues);
        //console.log("Script works. Run 'npm test' to Mock Sonarqube Output");
      });
      
      //sonar.sendRequest();
      //console.log(issues);*/
			convo.next();
			convo.say("Please Wait, analyzing");
			
      	});
      }
      else if(type.includes("goodbye")|| type.includes("bye"))
      {
      	convo.next();
      	convo.say("Good Bye!");
      	return;
      }
      else
      {
      	convo.next();
      	convo.say("Sorry I dont follow, exiting, try again from the start");
      	return;
      }
      convo.next(); // continue with conversation
    });

  });
});



