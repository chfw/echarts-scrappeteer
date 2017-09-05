const fs = require('fs');
const p = require('puppeteer');
const path = require('path');
const ProgressBar = require('progress');


var takeSnapshots = (async (urlOrFile, imageFormat, outputName) => {
	if(urlOrFile.indexOf("http") == -1 && urlOrFile.indexOf("file://") == -1){
		urlOrFile = 'file://' + path.join(process.cwd(), urlOrFile);
	}

	const browser = await p.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(urlOrFile, {waitUtil: 'networkidle'});

	const numberOfCharts = await countCharts(page);
	console.log("Found " + numberOfCharts + " echarts.");

	var barOpts = {
		width: 20,
		total: numberOfCharts,
		clear: true
	};
	var bar = new ProgressBar(' uploading [:bar] :percent :etas', barOpts);
	for(i=0; i<numberOfCharts; i++){
		const dataurl = await getAChart(page, imageFormat, i);
		saveDataUrl(dataurl, i, outputName);
		bar.tick(1);
	}

	browser.close();
	
});


async function countCharts(page){
	return await page.evaluate(() => {
		var echarts =  document.querySelectorAll('div[_echarts_instance_]');
		return echarts.length;
	});
}


async function getAChart(page, imageFormat, index){
	return page.evaluate((args) => {
		var ele =  document.querySelectorAll('div[_echarts_instance_]');
		var mychart = echarts.getInstanceByDom(ele[args.index]);
		return mychart.getDataURL({type:args.image_format,
								   excludeComponents: ['toolbox']});
	}, {image_format: imageFormat, index: index});
}


function saveDataUrl(dataurl, index, outputName){
	var regex = /^data:.+\/(.+);base64,(.*)$/;

	var matches = dataurl.match(regex);
	var ext = matches[1];
	var data = matches[2];
	var buffer = new Buffer(data, 'base64');
	fs.writeFileSync(outputName + '.' + index + '.' + ext, buffer);
}


module.exports = takeSnapshots;
