var fs = require('fs');
var lineReader = require('line-reader');
var ipRegex = require('ip-regex');

lineReader.eachLine('smtp.json', function (line) {
  fs.appendFile('ip.txt', line.match(ipRegex())[0] + '\n', function (err) {
    if (err) throw err;
  });
}).then(function () {
  consoole.log('done!');
})

