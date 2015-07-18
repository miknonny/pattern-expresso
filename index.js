#!/usr/bin/env node
var fs = require('fs');
var lineReader = require('line-reader');
var Spinner = require('cli-spinner').Spinner;
var regexPatterns = require('./Utils/regex-pattern');

var spinner = new Spinner('processing... %s');
spinner.setSpinnerString('|/-\\');
spinner.start();

_ipJuicer = {
  get: function (inFile, outFile, pattern) {
    lineReader.eachLine(inFile, function (line) {
      if (line.match(pattern) !== null) {
        fs.appendFile(outFile, line.match(pattern)[0] + '\n', function (err) {
          if (err) throw err;
        })
      }
    })
    .then(function () {
      console.log('done!');
    })
  }
}

var mainJuicer = function () {
  var src = process.argv[2];
  var dest = process.argv[3];
  var patternOption = process.argv[4];
  if (process.argv.length < 3) {
    console.log('invalid no of arguments entered');
    process.exit(1);  
  }
  if (regexPatterns[patternOption]) {
    if (patternOption === 'ipv4') {
      _ipJuicer.get(src, dest, regexPatterns.ipv4);
    }
    if (patternOption === 'ipv6') {
      _ipJuicer.get(src, dest, regexPatterns.ipv6);
    }
    if (patternOption === 'email') {
      _ipJuicer.get(src, dest, regexPatterns.email);
    }
    if (patternOption === 'url') {
      _ipJuicer.get(src, dest, regexPatterns.url)
    }
  } else {
    console.log('regex pattern is not valid.');
    process.exit(1)
  }
}

mainJuicer();

/**
 * Draw header
 * @param  {string} left  This is the text to go on the left
 * @param  {string} right This is the text for the right
 * @return {void}
 */