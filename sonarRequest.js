var request = require('superagent');
var username = "admin";
var password = "admin";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
// Use server IP instead of localhost if Sonarqube is not deploy on this machine.
var urlRoot = "http://localhost:9000";
var issues = [];
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
		// console.log("Actual Output from Sonarqube");
		// console.log(issues);
    console.log("Script works. Run 'npm test' to Mock Sonarqube Output");
});

module.exports.sendRequest = sendRequest;
