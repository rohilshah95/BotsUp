var son=require('./sonarRunner.js');
var sonar=require('./sonarRequest.js');
var Botkit = require('botkit');
var downloadGit = require('./downloadFromGit.js');
var download=require('download-file');
var https = require('https');
var fs = require('fs');
var downloader=require('./testingdownload.js');
//var sonar=require('./sonarRequest.js');
var request = require('superagent');
var docParser = require('./doc_parse.js')
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var issues=[];
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
    convo.ask('Do you want to upload the code or share github link? Or Just type define along with the function you want the definition of (eg. define substring)', function(answer, convo) {
      console.log(answer);
      var type = answer.text;
      console.log(type);
      console.log(type.includes("code"));
        //if it is a github file
      if(type.includes("github")){
      	convo.ask('Please provide the link to the raw file.', function(answer1, convo){
      		var gitLink=answer1.text;
          if(!gitLink.includes("github.com"))
          {
            convo.next();
            convo.say("Sorry this is not a github link, exiting");
            return;
          }
      		if(gitLink.includes("goodbye")|| gitLink.includes("bye"))
		    {
		    	convo.next();
		    	convo.say("Good Bye!");
		      	return;
		    }
      		gitLink = gitLink.substring(1, (gitLink.length - 1));
      		console.log(gitLink);
      	    downloadGit.downloadFile(gitLink);
      		var fileType = downloadGit.getFileType(gitLink);
      		console.log("Your file type is: " + fileType);
      		console.log("Github link is: " + gitLink);
      		convo.next();
      		convo.say('great');


          convo.next();
          convo.say("Issue1: This is an issue");
      		console.log("Github link is: "+gitLink);
      	});
      }
          //if it is a code
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
          console.log(private);

      		var permalink=answer2.file.permalink;

      		/*var options = {
			  "method": "GET",
			  "hostname": "files.slack.com",
			  "path": slug,
			  "rejectUnauthorized": "true",
			  "headers": {
			      "Authorization": "Bearer xoxp-256865299430-256034721060-256170554661-e9e93acfc3251d0d547cc9ca00ef1a38"
			  } 
			}*/
			downloader.pDownload(slug,permalink,"C:/Users/rgsha/Documents/Projects/Hackathon/BOT/to_scan_directory/test.java");
			//son.runSR();
			sonar.sendRequest("", function(map){
			    console.log("here");
			    issues = sonar.issues;
			    console.log(issues);
			    for (var i=0; i<issues.length; i++){
			    	convo.next();
			    	convo.say(issues[i].message);
				}
			});
			//convo.next();
      //son.run();
			// sendRequest("", function(map){
   //      // Uncomment the two lines below and comment third line for actual Sonarqube output
   //       console.log("Actual Output from Sonarqube");
   //       console.log(issues);
   //      //console.log("Script works. Run 'npm test' to Mock Sonarqube Output");
   //    });
      
      //sonar.sendRequest();
      //console.log(issues);*/
			convo.next();
			convo.say("Please Wait, analyzing");
      convo.next();
      convo.say("Issue1: This is an issue");
			
      	});
      }
      else if(type.includes("goodbye")|| type.includes("bye"))
      {
      	convo.next();
      	convo.say("Good Bye!");
      	return;
			}
			else if(type.includes("define") || type.includes("explain") || type.includes("info")){
				 var method_name = type.split(" ")[1]; //getting the method name from the string -- testing 
				 console.log("The method is " + method_name);
				 var res = docParser.getMethodDetails(method_name);
				 if(res==null || res.length==0)
		         {
		          convo.next();
		          convo.say("Sorry! That doesn't exist in my dictionary, exiting");
		          return;
		         }
				 var result = res[0].return_type + " " + res[0].method_name + " : " + res[0].description
				 convo.next();
				 convo.say(result);
				 
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
