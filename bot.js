var apiai = require('apiai');
//API AI token 
var app = process.env.APIAITOKEN;

var son = require('./sonarRunner.js');
var sonar=require('./sonarRequest.js');
var Botkit = require('botkit');
var downloadGit = require('./downloadFromGit.js');
var download=require('download-file');
var https = require('https');
var fs = require('fs');
var downloader=require('./testingdownload.js');
var request = require('superagent');
var docParser = require('./doc_parse.js');
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var issues=[];
var i=0;
var rule="";
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
          if(!gitLink.includes("github"))
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
      		sonar.sendRequest("", function(map){
			    console.log("here");
			    issues = sonar.issues;
			    console.log(issues);
			    for (var i=0; i<issues.length; i++){
			    	convo.next();
			    	convo.say("_Issue "+(i+1)+"_: *"+issues[i].message+"*");
				}
				convo.next();
				//console.log(issues);
				convo.ask("For more information on these issues, reply back with the issue number.", function(answer3, convo){
					var j=parseInt(answer3.text);
					console.log("j="+j);
					if(typeof j!='number')
					{
						convo.next();
						convo.say("Sorry that's not a number, exiting, try again from the start");
						return;
					}
					if(j>=i+1)
					{
						convo.next();
						convo.say("Sorry, such an issue number doesn't exist, exiting.")
						return;
					}
					sonar.rulesRequest(issues[j-1].rule, function(map){
						rule=sonar.rule;
						convo.next();
						var ans=rule.htmlDesc;
						ans=ans.replace(/<h2>/g, "*").replace(/<\/h2>/g, "*").replace(/<pre>/g, "```").replace(/<\/pre>/g, "```").replace(/<p>/g, "\n").replace(/<\/p>/g, "\n");
						convo.say(ans);
					});
				});
			});

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
      			convo.next();
		      	convo.say("Sorry I dont follow, exiting, try again from the start");
		      	return;
      		}
      		var private=answer2.file.url_private_download;
      		var slug = private.split('.com').pop();
      		console.log(slug);
            console.log(private);

      		var permalink=answer2.file.permalink;

      		
			downloader.pDownload(slug,permalink,"./to_scan_directory/test.java");
			//son.runSR();
			sonar.sendRequest("", function(map){
			    console.log("here");
			    issues = sonar.issues;
			    console.log(issues);
			    for (i=0; i<issues.length; i++){
			    	convo.next();
			    	convo.say("_Issue "+(i+1)+"_: *"+issues[i].message+"*");
				}
				convo.next();
				
				convo.ask("For more information on these issues, reply back with the issue number.", function(answer3, convo){
					var j=parseInt(answer3.text);
					console.log(typeof j+ " " +i + " ");
					if(typeof j!='number')
		      		{
		      			convo.next();
				      	convo.say("Sorry that's not a number, exiting, try again from the start");
				      	return;
		      		}
		      		if(j>=i+1)
		      		{
		      			convo.next();
		      			convo.say("Sorry, such an issue number doesn't exist, exiting.")
		      			return;
		      		}
					sonar.rulesRequest(issues[j-1].rule, function(map){
						rule=sonar.rule;
						convo.next();
						var ans=rule.htmlDesc;
						ans=ans.replace(/<h2>/g, "*").replace(/<\/h2>/g, "*").replace(/<pre>/g, "```").replace(/<\/pre>/g, "```").replace(/<p>/g, "\n").replace(/<\/p>/g, "\n");
						convo.say(ans);
					});
				});
			});
			
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
