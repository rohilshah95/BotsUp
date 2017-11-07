var child_process = require('child_process');

function makeParams(sessionID){
  var params = "-Dsonar.projectBaseDir=to_scan_directory/"+sessionID+" -Dsonar.projectKey="+sessionID+" -Dsonar.projectName="+sessionID+" -Dsonar.sources=.";
  return params;
}

var runSR = function(sessionID){
  child_process.exec("sonar-scanner "+makeParams(sessionID), function(error, stdout, stderr) {
    console.log(stdout);
  });
}

module.exports.runSR = runSR;
