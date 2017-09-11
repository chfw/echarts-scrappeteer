#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');
const chalk = require('chalk');

const DEFAULT_VIEW_PORT = [1300, 800];


function list(val) {
  return val.split(',');
}

program
    .arguments('<url/file>')
    .option('-f, --format <png/jpeg>', 'image format')
    .option('-o, --output <outputname>', 'output file name')
    .option('-w, --wait <delay in milli-seconds>', 'wait a while before scrapping')
    .option('-v, --viewPort <width,height>', 'force puppeteer to set viewport. for echarts gallery site only', list)
    .action(function(url_or_file){
        main(url_or_file, program.format, program.output, program.wait, program.viewPort);
    })
    .parse(process.argv);


function main(url_or_file, format, output, wait, viewPort){
    if (typeof output === 'undefined'){
        output = 'output';
    }
    if (typeof wait === 'undefined'){
        wait= 100;
    }
	if (typeof viewPort === 'undefined'){
		viewPort = DEFAULT_VIEW_PORT;
	} else if( viewPort.length != 2){
		console.error(chalk.cyan("Wrong view port parameter :") +
					  chalk.bold.red(viewPort))
		process.exit(1);
	}
    if (typeof format === 'undefined'){
        format = 'png';
    } else if (format != 'png' && format != 'jpeg'){
        console.error(chalk.cyan("Unsupported file format : ") +
                      chalk.bold.red(format));
        process.exit(1);
    }
    options = {
        imageFormat: format,
        outputName: output,
        wait: wait,
		viewPort: {
			width: viewPort[0],
			height: viewPort[1]
		}
    }
    scrappeteer.snapshot(url_or_file, options);
}
