#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');

program
	.arguments('<url/file>')
	.option('-t, --type <imagetype>', 'image format')
	.option('-o, --output <outputname>', 'output file name')
	.action(function(url_or_file){
		console.log('url: %s, type: %s, output: %s',
					url_or_file, program.type, program.output);
		console.log(scrappeteer);
		scrappeteer(url_or_file, program.type, program.output);
	})
	.parse(process.argv);
