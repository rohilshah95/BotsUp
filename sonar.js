var child_process = require('child_process');
var request = require('superagent');
var nock = require('nock');
var sleep = require('sleep');
//var mockData = require("./mockData.json")
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
var urlRoot = "http://localhost:9000";

function makeParams(sessionID) {
  var params = "-Dsonar.projectBaseDir=.analysis/" + sessionID + " -Dsonar.projectKey=" + sessionID + " -Dsonar.projectName=" + sessionID + " -Dsonar.sources=.";
  return params;
}
var analyse = function (sessionID) {
  return new Promise(function (resolve, reject) {
    child_process.exec("sonar-scanner " + makeParams(sessionID), function (error, stdout, stderr) {
      sleep.sleep(2); //sleeping for 2 seconds to check if webserver responds
      resolve(sessionID);
      if(!error && !stderr){
      }
      else {
      //  reject(stderr);
      }
    });
  });
}

var getIssues = function(sessionID) {
  return new Promise(function(resolve,reject){
    request
    .get(`${urlRoot}/api/issues/search?componentKeys=${sessionID}`)
    .end(function(err, res) {
      if (!err) {
        resolve(res.body);
      } else {
        reject(err);
      }
    });
  })
};

var getRules = function(rule) {
  return new Promise(function(resolve,reject){
    request
    .get(`${urlRoot}/api/rules/show?key=${rule}`)
    .end(function(err, res) {
      if (!err) {
        resolve(res.body);
      } else {
        reject(err);
      }
    });
  })
};



module.exports.analyse = analyse;
module.exports.getIssues = getIssues;
module.exports.getRules = getRules;

// Mock the request using Nock
// Returns issues array
// nock('http://localhost:9000')
//   .get('/api/issues/search')
//   .reply(200, mockData.issues);
//
// // Returns rule
// nock('http://localhost:9000')
//   .get('/api/rules/show?key=javascript:UnusedVariable')
//   .reply(200, mockData.rule);
