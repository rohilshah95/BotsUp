var request = require('superagent');
var nock = require('nock');
var intent;
var intentMock = require('./mockData.json');

// Mocking for intents - greeting, methodDef, analyze, analyzeGit
// nock('https://api.dialogflow.com')
//   .get('/v1/query?v=20170712&query=bye&lang=en&sessionId=ac6a77cb-9b56-4e56-84b6-f59312c1b4ae&timezone=America/New_York%27')
//   .reply(200, intentMock.analyze);

function getAIRes2(string, callback) {
    request
      .get('https://api.dialogflow.com/v1/query?v=20170712&query='+string +'&lang=en&sessionId=ac6a77cb-9b56-4e56-84b6-f59312c1b4ae&timezone=America/New_York%27')
      .set('Authorization', 'Bearer 315483e14fb542338f3d5ef392c044e0')
      .end(function(err, res) {
        console.log(res.text);
      });
};

function getAIRes3(string,callback) {
  var options = {
    url: 'https://api.dialogflow.com/v1/query?v=20170712&query=' + string + '&lang=en&sessionId=ac6a77cb-9b56-4e56-84b6-f59312c1b4ae&timezone=America/New_York%27',
    method: 'GET',
    headers: {
      'Authorization': "Bearer 315483e14fb542338f3d5ef392c044e0"
    },
  }
      request(options, function (error, response, body) {
       callback(response)
      }
      )
}


getAIRes3("hi",function(response){console.log(response)})
//getAIRes3("analyze",function(response,error){})
//getAIRes3("https://raw.githubusercontent.com/CJ8664/html5ever/master/Cargo.toml",function(response,error){})
