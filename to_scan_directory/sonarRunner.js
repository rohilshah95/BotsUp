var child_process = require('child_process');
//Change file pat
var run= function(){
	child_process.exec('C:/Users/rgsha/Documents/Projects/Hackathon/BOT/to_scan_directory/runSonar.bat', function(error, stdout, stderr) {
    console.log(stdout);
    console.log(error);
    console.log(stderr);
});
}

//run();
module.exports.run = run;
