var request = require('superagent');
var nock = require('nock');
//var mockData = require("./mockData.json")
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
//var urlRoot = "http://localhost:9000";
var urlRoot = "192.168.0.106:9000";
var issues = [];
var rulesOutput=null;
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

var sendRequest = function(string, callback) {
  request
    .get(`${urlRoot}/api/issues/search`)
    .end(function(err, res) {
      if (!err) {
        issues = res.body
        exports.issues = issues;
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
        rulesOutput = res.body;
        exports.rule = rulesOutput;
        callback(null, rulesOutput);
      } else {
        callback('Error Occurred!');
      }
    });
};

module.exports.sendRequest = sendRequest;
module.exports.rulesRequest = rulesRequest;