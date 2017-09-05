#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');

program
	.arguments('<url/file>')
	.option('-t, --type <imagetype>', 'image format')
	.option('-o, --output <outputname>', 'output file name')
	.action(function(url_or_file){
		if (typeof program.output === 'undefined'){
			program.output = 'output';
		}
		if (typeof program.type === 'undefined'){
			program.type = 'png';
		}
		scrappeteer(url_or_file, program.type, program.output);
	})
	.parse(process.argv);
