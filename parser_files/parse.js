const cheerio = require('cheerio');
const fs = require('fs');
const docFile = "D:/CSC510/bot/java_string.html";
var $ 

var methodQuery = {
	method_name : "hashCode"
}

var classQuery = {
	method_name : "String"
}
 var classTest = $('a[name=constructor_summary]').next().next().
find("code:contains('String')").parent().parent().text();

var methodTest = $('a[name=method_summary]').next().next().
find("code:contains('hashCode')").parent().parent().text();

fs.readFile(docFile, 'utf8', function(err,contents){
	 $ = cheerio.load(contents);

console.log(getMethodDetails(methodQuery.method_name));
});  

function getMethodDetails(methodName){
	var array = [];
	var result = $('a[name=method_summary]').next().next().
					find("code:contains(" + methodName + ")").parent().parent().map(function(){
		
						var eachText = $(this).text().trim().split(")");
						var section = eachText[0].split('\n');
						var index =1;
						var method_name="";
						while (index < section.length ){
							method_name +=section[index].trim();
							index ++;
						}
						array.push({
							"method_name" : method_name.trim() + ")",
							"return_type" : section[0].trim(),
							"description" : eachText[1].replace(/\n|\r/g,'').replace(/\s+/g, " ").trim()
						
					});
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