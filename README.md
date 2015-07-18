#Pattern Expresso.
Extracts regular expression patterns from large files that can not be buffered in memory. 

##Install
```
$ npm install -g pattern-expresso
```

Usage
pattern-expresso <source> <destination> <option>

##Options.
- ipv4: extract ipv4 addresses form file.
- ipv6: extracts ipv6 address from  file.
- url: extracts url from file.
- email: extract email from file.

## Example
```
$ pattern-expresso large_file.txt dest_file.txt ipv4
```
## Adding more patterns.
- Edit Util/regex-pattern.js to add more patterns.
## License
MIT © Michael Mbah
