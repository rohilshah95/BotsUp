
var request = require('request');

var getAiReply = function(AIresponse) {
    /// AIresponse = JSON.parse(AIresponse);
    console.log("\n\nin get ai reply \n\n");
    AIresponse = JSON.parse(AIresponse);
    if (AIresponse.result.metadata.intentName === "MethodDef") {
        var speech = AIresponse.result.parameters.method - name;
    }
    else if (AIresponse.result.metadata.intentName == "Greeting") {
        var speech = AIresponse.result.fulfillment.speech;
    }
    else if (AIresponse.result.metadata.intentName == "Analysis") {
        if (AIresponse.result.metadata.parameters == null) {
            var speech = AIresponse.result.fulfillment.speech;
        }
        else if (AIresponse.result.metadata.parameters.url == "github.com") {
            var speech = AIresponse.result.fulfillment.speech;
        }
    }
    return speech;
}

var callAI = function(say, callback) {
    var options = {
        url: "https://api.dialogflow.com/v1/query?v=20170712&query=" + say + "&lang=en&sessionId=ac6a77cb-9b56-4e56-84b6-f59312c1b4ae&timezone=America/New_York%27",
        method: 'GET',
        headers: {
            "Authorization": "Bearer 315483e14fb542338f3d5ef392c044e0"
        }
    };
    var AIreply;
    request(options, function (error, response, body) {
        callback(body);
    });
    //return AIreply;
}
module.exports.getAiReply = getAiReply;
module.exports.callAI = callAI;
