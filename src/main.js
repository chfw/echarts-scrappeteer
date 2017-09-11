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
	.option('-r, --clipRectangle <x,y,width,height>', 'record rectangle when making gif animation', list)
	.option('-c, --frameCounts <number>', 'of frames')
	.option('-i, --frameInterval <number>', 'frame intervals')
    .action(function(url_or_file){
        main(url_or_file, program.format, program.output,
			 program.wait, program.viewPort, program.clipRectangle,
			 program.frameCounts, program.frameInterval);
    })
    .parse(process.argv);


function main(url_or_file, format, output, wait, viewPort, clipRect, frameCounts, frameInterval){
    if (typeof output === 'undefined'){
        output = 'output';
    }
    if (typeof wait === 'undefined'){
        wait= 100;
    }

	if (typeof frameCounts === 'undefined'){
		frameCounts = 1;
	}
	if (typeof frameInterval === 'undefined'){
		frameInterval = 500;
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
    } else if (format != 'png' && format != 'jpeg' && format != 'gif'){
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
			height: viewPort[1],
			deviceScaleFactor: 2
		},
		clipRect: {
			x: parseInt(clipRect[0], 10),
			y: parseInt(clipRect[1], 10),
			width: parseInt(clipRect[2], 10),
			height: parseInt(clipRect[3], 10) 
		},
		skip: [1],
		frameCounts: parseInt(frameCounts),
		frameInterval: parseInt(frameInterval)
    }
    scrappeteer.snapshot(url_or_file, options);
}
