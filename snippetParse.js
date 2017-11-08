var unescape=require('unescape');
var fs=require('fs');
var mkdir=require('mkdirp');

var parse=function(text, dest, file){
    text=unescape(text);
    //console.log(text);
    mkdir(dest, function(err){
        fs.writeFile(file, text, function (err) {
            if (err)
                console.log(err);
            else
                console.log("File Saved");
        });
    });
    
}

//how to use  parse(snippet, directory to be created, file path) pass (snippet, .sessionID, .sessionID/file.ext)
//parse('int n', '.testing/','.testing/testing.js');
module.exports.parse=parse;
