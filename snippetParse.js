var unescape = require('unescape');
var fs = require('fs');
var mkdir = require('mkdirp');

var parse = function (language, snippet, options) {
    var extension = '';
    if (language === 'java')
        extension = 'java'
    else if (language === 'python')
        extension = 'py'
    else
        extension = 'js'
    snippet = unescape(snippet);
    snippet = snippet.replace(/```/g, "");
    console.log("Saved snippet will be \""+snippet+"\"");
    return new Promise(function (resolve, reject) {
        mkdir(options.directory, function (err) {
            var filename = '/analysis.' + extension;
            fs.writeFile(options.directory+filename, snippet, function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("File Saved to path " + options.directory);
                    resolve({session_id: options.session_id, directory: options.directory});
                }
            });
        });
    });
}
//how to use  parse(snippet, directory to be created, file path) pass (snippet, .sessionID, .sessionID/file.ext)
//parse('int n', '.testing/','.testing/testing.js');
module.exports.parse = parse;