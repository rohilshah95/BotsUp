var request = require('superagent');
var nock = require('nock');
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
var urlRoot = "http://localhost:9000";
var issues = [];
var issuesResponse ={"issues": [
{
"organization": "default-organization",
"key": "AV8mBOruNzdILZC6QEb-",
"rule": "javascript:UnusedVariable",
"severity": "MINOR",
"component": "my:project1:bot.js",
"project": "my:project1",
"line": 57,
"textRange": {
  "startLine": 57,
  "endLine": 57,
  "startOffset": 5,
  "endOffset": 6
},
"flows": [],
"status": "OPEN",
"message": "Remove the declaration of the unused 'a' variable.",
"effort": "5min",
"debt": "5min",
"author": "rshah8@ncsu.edu",
"tags": [
  "unused"
],
"creationDate": "2017-10-13T20:59:53-0400",
"updateDate": "2017-10-16T12:29:26-0400",
"type": "CODE_SMELL"
},
{
"organization": "default-organization",
"key": "AV8mBOrvNzdILZC6QEb_",
"rule": "javascript:UnusedVariable",
"severity": "MINOR",
"component": "my:project1:bot.js",
"project": "my:project1",
"line": 58,
"textRange": {
  "startLine": 58,
  "endLine": 58,
  "startOffset": 5,
  "endOffset": 6
},
"flows": [],
"status": "OPEN",
"message": "Remove the declaration of the unused 'b' variable.",
"effort": "5min",
"debt": "5min",
"author": "rshah8@ncsu.edu",
"tags": [
  "unused"
],
"creationDate": "2017-10-13T20:59:53-0400",
"updateDate": "2017-10-16T12:29:26-0400",
"type": "CODE_SMELL"
}
]};

// Mock the request using Nock
nock('http://localhost:9000')
  .get('/api/issues/search')
  .reply(200, issuesResponse);


var sendRequest = function(string, callback) {
  request
    .get(`${urlRoot}/api/issues/search`)
    .end(function(err, res) {
      if (!err) {
        issues = res.body.issues.map(function(issue) {
					return issue;
				});
        callback(null, issues);
      } else {
        callback('Error Occurred!');
      }
    });
};

sendRequest("", function(map){
    // Uncomment the two lines below and comment third line for actual Sonarqube output
		 console.log("Actual Output from Sonarqube");
		 console.log(issues);
    //console.log("Script works. Run 'npm test' to Mock Sonarqube Output");
});

module.exports.sendRequest = sendRequest;
