var child_process = require('child_process');
var params="sonar.projectBaseDir=to_scan_directory";
var runSR = function(){
  child_process.exec("sonar-scanner -D"+params, function(error, stdout, stderr) {
    console.log(stdout);
});
}

module.exports.runSR = runSR;
