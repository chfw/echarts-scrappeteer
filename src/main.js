#!/usr/bin/env node

var program = require('commander');
const scrappeteer = require('./scrappeteer');
const chalk = require('chalk');

program
    .arguments('<url/file>')
    .option('-f, --format <png/jpeg>', 'image format')
    .option('-o, --output <outputname>', 'output file name')
    .option('-w, --wait <delay in milli-seconds>', 'wait a while before scrapping')
    .action(function(url_or_file){
        main(url_or_file, program.format, program.output, program.wait);
    })
    .parse(process.argv);


function main(url_or_file, format, output, wait){
    if (typeof output === 'undefined'){
        output = 'output';
    }
    if (typeof wait === 'undefined'){
        wait= 100;
    }
    if (typeof format === 'undefined'){
        format = 'png';
    } else if (format != 'png' && format != 'jpeg'){
        console.error(chalk.cyan("Unsupported file format : ") +
                      chalk.bold.red(format));
        process.exit(1);
    }
    scrappeteer.snapshot(url_or_file, format, output, wait);
}
