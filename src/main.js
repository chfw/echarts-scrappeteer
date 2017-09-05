#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');
const chalk = require('chalk');


program
	.arguments('<url/file>')
	.option('-f, --format <png/jpeg>', 'image format')
	.option('-o, --output <outputname>', 'output file name')
	.action(function(url_or_file){
		if (typeof program.output === 'undefined'){
			program.output = 'output';
		}
		if (typeof program.format === 'undefined'){
			program.format = 'png';
		} else if (program.format != 'png' || program.format != 'jpeg'){
			console.error(chalk.cyan("Unsupported file format : ") +
						  chalk.bold.red(program.format));
			process.exit(1);
		}
		scrappeteer(url_or_file, program.format, program.output);
	})
	.parse(process.argv);
