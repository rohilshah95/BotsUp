var request = require('superagent');
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

var urlRoot = "http://localhost:9000";

// sendRequest();

// function sendRequest()
// {
//
// 	var options = {
// 		url: urlRoot + '/api/issues/search',
// 		method: 'GET',
// 		headers: {
// 			"Authorization": auth
// 		}
// 	};
//
// 	request(options, function (error, response, body)
// 	{
// 		console.log("\nResponse: ")
// 		var obj = JSON.parse(body);
// 		console.log(obj);
// 	});
// }
var string = "";
var sendRequest = function(string, callback) {
  request
    .get(`${urlRoot}/api/issues/search`)
    .end(function(err, res) {
      if (!err) {
        var issues = res.body.issues.map(function(issue) {
					return issue.message;
				});
        callback(null, issues);
      } else {
        callback('Error Occurred!');
      }
    });
};

module.exports.sendRequest = sendRequest;
