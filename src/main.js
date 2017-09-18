#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');
const chalk = require('chalk');


const DEFAULTS = {
  outputName: "output",
  wait: 100,
  frameCounts: 1,
  frameInterval: 500,
  viewPort: [1300, 800, 1],
  imageFormat: 'png',
}


program
  .arguments('<url/file>')
  .option('-f, --format <png/jpeg>', 'image format')
  .option('-o, --output <outputname>', 'output file name')
  .option('-w, --wait <delay in milli-seconds>', 'wait a while before scrapping', intValue)
  .option('-v, --viewPort <width,height>', 'force puppeteer to set viewport. for echarts gallery site only', viewPort)
  .option('-r, --clipRectangle <x,y,width,height>', 'record rectangle when making gif animation', intArray)
  .option('-c, --frameCounts <number>', 'of frames. gif only', intValue)
  .option('-i, --frameInterval <number>', 'frame intervals. gif only', intValue)
  .option('-s, --skipFrames <number>', 'skip initial frames. gif only', intValue)
  .option('-g, --gap time<number>', 'between each gif snapshot. gif only', intValue)
  .action(function(url_or_file){
    main(url_or_file, program);
  })
  .parse(process.argv);


function main(url_or_file, program){
  var options = {}
  if(program.frameCounts){
    options.frameCounts = program.frameCounts;
  }
  if(program.frameInterval){
    options.frameInterval = program.frameInterval;
  }
  if(program.skil){
    options.skipFrames = program.skip;
  }
  if(program.wait){
    options.wait = program.wait;
  }
  if(program.format){
    options.imageFormat = program.format;
  }
  if(program.output){
    options.outputName = program.output;
  }
  if(program.clipRectangle){
    options.clipRect = {
      x: program.clipRectangle[0],
      y: program.clipRectangle[1],
      width: program.clipRectangle[2],
      height: program.clipRectangle[3]
    }
  }
  if(program.viewPort){
    if( program.viewPort.length != 3){
      console.error(chalk.cyan("Wrong view port parameter :") +
		    chalk.bold.red(program.viewPort))
      process.exit(1);
    }
    options.viewPort = {
      width: program.viewPort[0],
      height: program.viewPort[1],
      deviceScaleFactor: 1
    }
  }
  var final_options = Object.assign({}, DEFAULTS, options);
  if (final_options.imageFormat != 'png' && final_options.imageFormat != 'jpeg' && final_options.imageFormat != 'gif'){
    console.error(chalk.cyan("Unsupported file format : ") +
                  chalk.bold.red(final_options.imageFormat));
    process.exit(1);
  }
  scrappeteer.snapshot(url_or_file, final_options);
}


function intArray(val) {
  return val.split(',').map(function(x){ return parseInt(x, 10) });
}


function intValue(val) {
  return parseInt(val, 10);
}


function viewPort(val) {
  var ret = intArray(val);
  ret.push(1);
  return ret;
}
