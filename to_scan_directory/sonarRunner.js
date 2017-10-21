var child_process = require('child_process');
//Change file path
child_process.exec('*directory_runSonar.bat*', function(error, stdout, stderr) {
    console.log(stdout);
});
