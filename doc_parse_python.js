const cheerio = require('cheerio');
const fs = require('fs');
const docFile = "./pythondocs/builtin_python.html";
const encoding = 'utf8';
const $ = cheerio.load(fs.readFileSync(docFile, encoding));

exports.getMethodDetails = function(methodName){
    var array = [];
    //$x("//dl/dt[@id = 'abs']/following-sibling::dd/p")

    var result = $('dl').find("code:contains(" + methodName + ")").map(function () {
        var ret_type = $(this).parent().parent().children('dd').first().text();
        if (ret_type!=null && ret_type.trim().length>0){
            array.push({
                "description": ret_type
            })
            console.log("ret_type =   " + ret_type + "\n");
        }
        
    });    
    return array;
	// if array is empty handle exception.

}

exports.getClassDetails = function(className){
	var array = [];
	var result = $('em').find("code:contains(" + className + ")").map(function () {
	    var ret_type = $(this).parent().parent().children('dd').first().text();
	    array.push({
	        "description": ret_type
	    })
	    console.log("ret_type= " + ret_type + "\n");
	});
	return array;
	// if array is empty handle exception.
}
