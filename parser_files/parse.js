const cheerio = require('cheerio');
const fs = require('fs');
const docFile = "D:/CSC510/BOT/parser_files/java_string.html";
const encoding = 'utf8';
const $ = cheerio.load(fs.readFileSync(docFile, encoding));
exports.getMethodDetails = function(methodName){
	var array = [];
	var result = $('a[name=method_summary]').next().next().
					find("code:contains(" + methodName + ")").map(function(){
						var ret_type = $(this).parent().prev().text() 
						if (ret_type!=null && ret_type.trim().length>0){
							array.push({
								"method_name" :$(this).text().replace(/\n|\r/g,'').replace(/\s+/g, " ").trim(),
								"return_type" : $(this).parent().prev().text().replace(/\n|\r/g,'').replace(/\s+/g, " ").trim(),
								"description" :$(this).next().text().replace(/\n|\r/g,'').replace(/\s+/g, " ").trim()
						 });
						}
					 	//"description" : eachText[1].replace(/\n|\r/g,'').replace(/\s+/g, " ").trim()

				});
	return array;
	// if array is empty handle exception.

}
function getClassDetails(className){
	var array = [];
	var result = $('a[name=constructor_summary]').next().next().
					find("code:contains(" + className + ")").parent().parent().map(function(){
						var eachText = $(this).text().split("\n");
						var eachJson = {
							"constructor_name" : eachText[0].trim(),
							"description" : eachText[1].trim()
						}
						array.push(eachJson);
					});
	return array;
	// if array is empty handle exception.
}

