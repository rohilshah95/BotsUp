var request = require('superagent');
var nock = require('nock');
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
var urlRoot = "http://localhost:9000";
var issues = [];
var rulesOutput=null;
var rulesResponse = {"rule": {
  "key": "javascript:UnusedVariableMuhahahahah",
  "repo": "javascript",
  "name": "Unused local variables and functions should be removed",
  "createdAt": "2017-10-10T12:49:21-0400",
  "htmlDesc": "<p>If a local variable or a local function is declared but not used, it is dead code and should be removed. Doing so will improve maintainability\nbecause developers will not wonder what the variable or function is used for.</p>\n<h2>Noncompliant Code Example</h2>\n<pre>\nfunction numberOfMinutes(hours) {\n  var seconds = 0;   // seconds is never used\n  return hours * 60;\n}\n</pre>\n<h2>Compliant Solution</h2>\n<pre>\nfunction numberOfMinutes(hours) {\n  return hours * 60;\n}\n</pre>",
  "mdDesc": "<p>If a local variable or a local function is declared but not used, it is dead code and should be removed. Doing so will improve maintainability\nbecause developers will not wonder what the variable or function is used for.</p>\n<h2>Noncompliant Code Example</h2>\n<pre>\nfunction numberOfMinutes(hours) {\n  var seconds = 0;   // seconds is never used\n  return hours * 60;\n}\n</pre>\n<h2>Compliant Solution</h2>\n<pre>\nfunction numberOfMinutes(hours) {\n  return hours * 60;\n}\n</pre>",
  "severity": "MINOR",
  "status": "READY",
  "internalKey": "UnusedVariable",
  "isTemplate": false,
  "tags": [],
  "sysTags": [
    "unused"
  ],
  "lang": "js",
  "langName": "JavaScript",
  "params": [],
  "defaultDebtRemFnType": "CONSTANT_ISSUE",
  "defaultDebtRemFnOffset": "5min",
  "debtOverloaded": false,
  "debtRemFnType": "CONSTANT_ISSUE",
  "debtRemFnOffset": "5min",
  "defaultRemFnType": "CONSTANT_ISSUE",
  "defaultRemFnBaseEffort": "5min",
  "remFnType": "CONSTANT_ISSUE",
  "remFnBaseEffort": "5min",
  "remFnOverloaded": false,
  "type": "CODE_SMELL"
}};


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

nock('http://localhost:9000')
  .get('/api/rules/show?key=javascript:UnusedVariable')
  .reply(200, rulesResponse);


var sendRequest = function(string, callback) {
  request
    .get(`${urlRoot}/api/issues/search`)
    .end(function(err, res) {
      if (!err) {
        issues = res.body.issues.map(function(issue) {
					return issue;
				});
        return issues;
        callback(null, issues);
      } else {
        callback('Error Occurred!');
      }
    });
};

var rulesRequest = function(rule, callback) {
  request
    .get(`${urlRoot}/api/rules/show?key=${rule}`)
    .end(function(err, res) {
      if (!err) {
        console.log("Hi");
        rulesOutput = res.body.rule;
        callback(null, rulesOutput);
      } else {
        callback('Error Occurred!');
      }
    });
};

// rulesRequest("javascript:UnusedVariable", function(map){
//     // Uncomment the two lines below and comment third line for actual Sonarqube output
// 		 console.log("Actual Output from Sonarqube blah");
// 		 console.log(rulesOutput);
//     //console.log("Script works. Run 'npm test' to Mock Sonarqube Output");
// });
//
// sendRequest("", function(map){
//     // Uncomment the two lines below and comment third line for actual Sonarqube output
// 		 console.log("Actual Output from Sonarqube");
// 		 console.log(issues);
//     //console.log("Script works. Run 'npm test' to Mock Sonarqube Output");
// });

module.exports.sendRequest = sendRequest;
// module.exports.rulesRequest = rulesRequest;
// module.exports.issues = issues;
