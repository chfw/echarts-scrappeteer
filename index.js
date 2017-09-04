#!/usr/bin/env node

const p = require('puppeteer');
const path = require('path');
const fs = require('fs');

if(process.argv.length < 4){
	console.log("Usage: " + __filename + " pyecharts_outpout.html [png|jpeg]");
	process.exit(-1);
}

var html_file = process.argv[2];
const image_format = process.argv[3];

if(html_file.indexOf("http") == -1 and html_file.indexOf("file://") == -1){
	html_file = 'file://' + path.join(__dirname, html_file);
}

(async () => {

	const browser = await p.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(html_file, {waitUntil: 'networkidle'});

	const number = await page.evaluate((args) => {
		var ele =  document.querySelectorAll('div[_echarts_instance_]');
		return ele.length;
	}, {image_format: image_format});

	console.log("Found " + number + " echarts");
	for(i=0;i<number;i++){
		const result = await page.evaluate((args) => {
			var ele =  document.querySelectorAll('div[_echarts_instance_]');
			var mychart = echarts.getInstanceByDom(ele[args.index]);
			return mychart.getDataURL({type:args.image_format,
									   excludeComponents: ['toolbox']});
		}, {image_format: image_format, index: i});

		var regex = /^data:.+\/(.+);base64,(.*)$/;

		var matches = result.match(regex);
		var ext = matches[1];
		var data = matches[2];
		var buffer = new Buffer(data, 'base64');
		fs.writeFileSync('output.' + i + '.' + ext, buffer);
	}
	
	browser.close();

})();
