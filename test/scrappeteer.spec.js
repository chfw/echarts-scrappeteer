const rewire = require('rewire');
const fs = require('fs');
const path = require('path');
var assert = require('assert');

var scrappeteer = rewire(path.join(process.cwd(), 'src', 'scrappeteer.js'));

describe('Scrappeteer', function(){

	it('should save data url as image', function(){
		var saveDataUrl = scrappeteer.__get__('saveDataUrl');
		fs.readFile(path.join(process.cwd(), 'test', 'google.data.url.txt'), "utf8", function read(err, data){
			if (err) {
				throw err;
			}
			saveDataUrl(data.trim(), 1, 'output');
			var status = fs.existsSync('output.1.png');
			assert.equal(status, true);
			fs.unlink('output.1.png', (err) => {});
		});
	});
});
