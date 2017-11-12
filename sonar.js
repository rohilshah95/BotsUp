const child_process = require('child_process');
const request = require('superagent');
//const nock = require('nock');
const sleep = require('sleep');
//var mockData = require("./mockData.json")
//const username = "admin";
//var password = "admin";
//var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
const urlRoot = "http://localhost:9000";


var analyse = function (scanOptions) {
  return new Promise(function (resolve, reject) {
    child_process.exec("sonar-scanner " + makeParams(scanOptions), function (error, stdout, stderr) {
      sleep.sleep(5); //sleeping for 2 seconds to check if webserver responds
      console.log("Scanner resolved with id " + scanOptions.session_id)
      resolve(scanOptions.session_id);
      if(!error && !stderr){
      }
      else {
      //  reject(stderr);
      }
    });
  });
}

var getIssues = function(sessionID) {
  return request.get(`${urlRoot}/api/issues/search?componentKeys=${sessionID}`)

};

var getRules = function(rule) {
   return request.get(`${urlRoot}/api/rules/show?key=${rule}`)
};

function makeParams(scanOptions) {
  var params = "-Dsonar.projectBaseDir=" + scanOptions.directory + " -Dsonar.projectKey=" + scanOptions.session_id + " -Dsonar.projectName=" + scanOptions.session_id + " -Dsonar.sources=.";
  return params;
}

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
