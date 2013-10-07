var check = require('validator').check,
    sanitize = require('validator').sanitize
var Chance = require('chance');
var fs = require('fs');
var chance = new Chance(function() { return Math.random(); });
check(process.argv[2], 'Please enter a number').isInt();  
check(process.argv[3], 'Please enter a file path').notNull();

var amountOfCodes = sanitize(process.argv[2]).toInt();
var exportType = process.argv[4];
var outputFile = process.argv[3];

var stream = fs.createWriteStream(outputFile);
stream.once('open', function(fd) {
for (var i=0;i<amountOfCodes;i++){
var encodedStr;
encodedStr = chance.string({length: 4, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})+"-"+chance.string({length: 4, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})+"-"+chance.string({length: 4, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
if(exportType == "newLine"){
  stream.write(encodedStr+"\n");
}else if(exportType == "csv"){
  if(i == amountOfCodes){
stream.write(encodedStr);
  }else{
  	stream.write(encodedStr+",");
  }
}
}
  stream.end();
});