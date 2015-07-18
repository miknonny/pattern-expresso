#!/usr/bin/env node
'use strict';

var fs = require('fs');
var lineReader = require('line-reader');
var Spinner = require('cli-spinner').Spinner;
var regexPatterns = require('./Utils/regex-pattern');

var spinner = new Spinner('processing... %s');
spinner.setSpinnerString('|/-\\');
spinner.start();

var _finder = {
  extract: function (inFile, outFile, pattern) {
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

var main = function () {
  var src = process.argv[2];
  var dest = process.argv[3];
  var patternOption = process.argv[4];
  if (process.argv.length < 3) {
    console.log('Usage: $ pattern-expresso <source> <destination> <option>');
    process.exit(1);  
  }
  if (regexPatterns[patternOption]) {
    if (patternOption === 'ipv4') {
      _finder.extract(src, dest, regexPatterns.ipv4);
    }
    if (patternOption === 'ipv6') {
      _finder.extract(src, dest, regexPatterns.ipv6);
    }
    if (patternOption === 'email') {
      _finder.extract(src, dest, regexPatterns.email);
    }
    if (patternOption === 'url') {
      _finder.extract(src, dest, regexPatterns.url)
    }
  } else {
      console.log('Usage: $ pattern-expresso <source> <destination> <option>');
      process.exit(1)
  }
}

main();
