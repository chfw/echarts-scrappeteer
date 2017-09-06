const rewire = require('rewire');
const path = require('path');
const scrappeteer = require(path.join(process.cwd(), 'src', 'scrappeteer.js'));
const sinon = require('sinon');


describe('main', function(){

	it('should handle a url', function(){
		var main = rewire(path.join(process.cwd(), 'src', 'main.js'));
		//sinon.stub(scrappeteer).returns(0);
		//main('file', 'png', 'output');
	});
	
});
