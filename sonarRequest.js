//var mock = require('./mock');
var request = require('request');
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

var urlRoot = "http://localhost:9000";

sendRequest();

function sendRequest()
{

	var options = {
		url: urlRoot + '/api/issues/search',
		method: 'GET',
		headers: {
			"Authorization": auth
		}
	};

	request(options, function (error, response, body)
	{
		console.log("\nResponse: ")
		var obj = JSON.stringify(body);
    console.log(obj);
	});
}
