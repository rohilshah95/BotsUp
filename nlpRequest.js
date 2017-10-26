var request = require('superagent');
var apiai = require('apiai');
var app = apiai(Process.env.AITOKEN);
var nock = require('nock');
var intent;
var intentMock = require('./mockData.json');

// Mocking for intents - greeting, methodDef, analyze, analyzeGit
nock('https://api.dialogflow.com')
  .get('/v1/query?v=20170712&query=bye&lang=en&sessionId=ac6a77cb-9b56-4e56-84b6-f59312c1b4ae&timezone=America/New_York%27')
  .reply(200, intentMock.analyze);

var intentRequest = function(string, callback) {
    request
      .get(`https://api.dialogflow.com/v1/query?v=20170712&query=bye&lang=en&sessionId=ac6a77cb-9b56-4e56-84b6-f59312c1b4ae&timezone=America/New_York%27`)
      .set('Authorization', 'Bearer 315483e14fb542338f3d5ef392c044e0')
      .end(function(err, res) {
        if (!err) {
          intent = res.body
          exports.intent = intent;
          callback(null, intent);
        } else {
          callback('Error Occurred!');
        }
      });
};

module.exports.intentRequest = intentRequest;