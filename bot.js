
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);
var download=require('download-file');
var https = require('https');
var fs = require('fs');
var downloader=require('./testingdownload.js');
console.log(typeof downloader.pDownload);

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
      if(type==="github"){
      	convo.ask('Please provide the link to the raw file.', function(answer1, convo){
      		var gitLink=answer1.text;
      		gitLink=gitLink.substring(1,(gitLink.length-1));
      		convo.next();
      		convo.say('great');
      		console.log("Github link is: "+gitLink);
      	});
      }
      else
      {
      	convo.ask('Please upload the code file', function(answer2, convo){
      		console.log(answer2);
      		var private=answer2.file.url_private_download;
      		var slug = private.split('.com').pop();
      		console.log(slug);

      		var permalink=answer2.file.permalink;
			}
			downloader.pDownload(slug,permalink,"C:/Users/rgsha/Documents/Projects/SE/SlackBot/test.js");
			
      	});
      }

      	// do something with this answer!
      // storeTacoType(convo.context.user, taco_type);
      //convo.say('YUMMMM!!!'); // add another reply
      convo.next(); // continue with conversation
    });
  });
});



