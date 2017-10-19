const cheerio = require('cheerio');
const fs = require('fs');
const docFile = "D:/CSC510/bot/sample.html";

fs.readFile(docFile, 'utf8', function(err,contents){
	var $ = cheerio.load(contents);
//gets the id of all apple classes
//console.log($('.apple').attr('id'));
//get the text of all the items with class = chips and  within id 'snacks'
//console.log($('.chips', '#snacks').text());

//console.log($('#fruits').contents().attr('id'));
//console.log($($('#fruits').find($('.apple')).length));
//get all items 
//console.log($('#one').find($('.apple')).attr('taste'));
//console.log($('#fruits').nextUntil($('#sweets')).attr('id'));
//console.log($('#one'));
console.log($('#fruits').children().has('funny').attr('id'));
});
