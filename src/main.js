#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');
const chalk = require('chalk');


const DEFAULTS = {
  output: "output",
  wait: 100,
  frameCounts: 1,
  frameInterval: 500,
  viewPort: [1300, 800, 1],
  format: 'png',
}


program
  .arguments('<url/file>')
  .option('-f, --format <png/jpeg>', 'image format')
  .option('-o, --output <outputname>', 'output file name')
  .option('-w, --wait <delay in milli-seconds>', 'wait a while before scrapping')
  .option('-v, --viewPort <width,height>', 'force puppeteer to set viewport. for echarts gallery site only', intArray)
  .option('-r, --clipRectangle <x,y,width,height>', 'record rectangle when making gif animation', intArray)
  .option('-c, --frameCounts <number>', 'of frames', intValue)
  .option('-i, --frameInterval <number>', 'frame intervals', intValue)
  .action(function(url_or_file){
    main(url_or_file, program);
  })
  .parse(process.argv);


function main(url_or_file, program){
  var options = Object.assign({}, DEFAULTS, program);
  if( options.viewPort.length != 3){
    console.error(chalk.cyan("Wrong view port parameter :") +
		  chalk.bold.red(options.viewPort))
    process.exit(1);
  }
  if (options.format != 'png' && options.format != 'jpeg' && options.format != 'gif'){
    console.error(chalk.cyan("Unsupported file format : ") +
                  chalk.bold.red(options.format));
    process.exit(1);
  }
  console.log(options);
  scrappeteer.snapshot(url_or_file, options);
}


function intArray(val) {
  return val.split(',').map(function(x){ return parseInt(x, 10) });
}


function intValue(val) {
  return parseInt(val, 10);
}
