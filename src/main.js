#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');
const chalk = require('chalk');

program
	.arguments('<url/file>')
	.option('-f, --format <png/jpeg>', 'image format')
	.option('-o, --output <outputname>', 'output file name')
	.action(function(url_or_file){
		main(url_or_file, program.format, program.output);
	})
	.parse(process.argv);


function main(url_or_file, format, output){
	if (typeof output === 'undefined'){
		output = 'output';
	}
	if (typeof format === 'undefined'){
		format = 'png';
	} else if (format != 'png' && format != 'jpeg'){
		console.error(chalk.cyan("Unsupported file format : ") +
					  chalk.bold.red(format));
		process.exit(1);
	}
	scrappeteer.snapshot(url_or_file, format, output);
}
