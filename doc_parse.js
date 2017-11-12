const cheerio = require('cheerio');
const fs = require('fs');
const encoding = 'utf8';
const docFile = "./pythondocs/builtin_python.html";
const $ = cheerio.load(fs.readFileSync(docFile, encoding));
const ERROR_MSG = "Sorry! I could not find any information related to this"

exports.getDefinition = function (language, method_name) {
    var result = "";
    if (language && method_name) {
        if (language === 'java') {
            var res = getJavaMethodDetails(method_name);
            if (res == null || res.length == 0) {
                result = ERROR_MSG;
            } else {
                result = res[0].return_type + " " + res[0].method_name + " : " + res[0].description;
            }
        } else if (language === 'python') {
            var res = getPythonMethodDetails(method_name);
            if (res == null || res.length == 0) {
                result = ERROR_MSG;
            } else {
                result = res[0].description;
            }
        }
    }
    return result;
}

function getJavaMethodDetails(methodName) {
    var array = [];
    for (i = 1; i <= 5; i++) {
        const docFile = "./javadocs/" + i + ".html";
        const $ = cheerio.load(fs.readFileSync(docFile, encoding));
        var result = $('a[name=method_summary]').next().next().
        find("code:contains(" + methodName + ")").map(function () {
            console.log("Parsing");
            var ret_type = $(this).parent().prev().text()
            if (ret_type != null && ret_type.trim().length > 0) {
                array.push({
                    "method_name": $(this).text().replace(/\n|\r/g, '').replace(/\s+/g, " ").trim(),
                    "return_type": $(this).parent().prev().text().replace(/\n|\r/g, '').replace(/\s+/g, " ").trim(),
                    "description": $(this).next().text().replace(/\n|\r/g, '').replace(/\s+/g, " ").trim()
                });
            }
            //"description" : eachText[1].replace(/\n|\r/g,'').replace(/\s+/g, " ").trim()
        });
    }
    return array;
    // if array is empty handle exception.
}

function getPythonMethodDetails(methodName) {
    var array = [];
    //$x("//dl/dt[@id = 'abs']/following-sibling::dd/p")

    var result = $('dl').find("code:contains(" + methodName + ")").map(function () {
        var ret_type = $(this).parent().parent().children('dd').first().text();
        if (ret_type != null && ret_type.trim().length > 0) {
            array.push({
                "description": ret_type
            })
            console.log("ret_type =   " + ret_type + "\n");
        }

    });
    return array;
    // if array is empty handle exception.

}

// Future Development
// function getJavaClassDetails(className) {
//     var array = [];
//     var result = $('a[name=constructor_summary]').next().next().
//     find("code:contains(" + className + ")").parent().parent().map(function () {
//         var eachText = $(this).text().split("\n");
//         var eachJson = {
//             "constructor_name": eachText[0].trim(),
//             "description": eachText[1].trim()
//         }
//         array.push(eachJson);
//     });
//     return array;
//     // if array is empty handle exception.
// }


// function getPythonClassDetails(className) {
//     var array = [];
//     var result = $('em').find("code:contains(" + className + ")").map(function () {
//         var ret_type = $(this).parent().parent().children('dd').first().text();
//         array.push({
//             "description": ret_type
//         })
//         console.log("ret_type= " + ret_type + "\n");
//     });
//     return array;
//     // if array is empty handle exception.
// }
