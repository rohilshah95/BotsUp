const child_process = require('child_process');
const request = require('superagent');
const urlRoot = "http://localhost:9000";

var analyse = function (scanOptions) {
  return new Promise(function (resolve, reject) {
    child_process.exec("sonar-scanner " + makeParams(scanOptions), function (error, stdout, stderr) {
      console.log("Scanner resolved with id " + scanOptions.session_id)
      resolve(scanOptions.session_id);
      if (!error && !stderr) {
      }
      else {
        //  reject(stderr);
      }
    });
  });
}
/* const getIssues :  Reference to an anonymous function that does the following
                      1) Poll for a valid anaysis status from sonarqube
                      2) Returns a promise for the issues response back to the process chain */
const getIssues = (sessionID) =>  request.get(`${urlRoot}/api/ce/component?componentKey=${sessionID}`).retry(1000000, retryCondition )
  .then(() =>request.get(`${urlRoot}/api/issues/search?componentKeys=${sessionID}`)
  )
/* const getRules : Reference to an anonymous function that returns a promise with the issue rule details back 
                    to the process chain the AnalysisFeedback activity */
const getRules = (rule) => request.get(`${urlRoot}/api/rules/show?key=${rule}`)
  
/* const retryCondition : Reference to an anonymous function that serves as a callback to superagent.retry() 
                          It checks if a valid status response from sonarqube is available */
const retryCondition = (err, res) => !(("object" == typeof res) && res.body && res.body.current && (res.body.current.status === "SUCCESS" || res.body.current.status === "FAILED"))

function makeParams(scanOptions) {
  var params = "-Dsonar.projectBaseDir=" + scanOptions.directory + " -Dsonar.projectKey=" + scanOptions.session_id + " -Dsonar.projectName=" + scanOptions.session_id + " -Dsonar.sources=.";
  return params;
}

module.exports.analyse = analyse;
module.exports.getIssues = getIssues;
module.exports.getRules = getRules;


//const nock = require('nock');

//var mockData = require("./mockData.json")
//const username = "admin";
//var password = "admin";
//var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
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
