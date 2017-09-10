const fs = require('fs');
const p = require('puppeteer');
const path = require('path');
const ProgressBar = require('progress');
const chalk = require('chalk');


const ECHARTS_GALLERY = 'http://gallery.echartsjs.com/';


var takeSnapshots = (async (urlOrFile, options) => {
    if(urlOrFile.indexOf("http") == -1 && urlOrFile.indexOf("file://") == -1){
        urlOrFile = 'file://' + path.join(process.cwd(), urlOrFile);
    }

    const browser = await p.launch({headless: false});
    const page = await browser.newPage();
    if(urlOrFile.indexOf(ECHARTS_GALLERY) != -1){
        await page.setViewport(options.viewPort);
    }
    await page.goto(urlOrFile, {waitUtil: 'networkidle'});

    try{
        await page.waitForNavigation({timeout: options.wait});
    }catch(e){
    }

    if(urlOrFile.indexOf(ECHARTS_GALLERY) != -1){
		const mainFrame = page.mainFrame();
        const childFrames = mainFrame.childFrames();
        await scrapeEcharts(childFrames[0], options.imageFormat, options.outputNAme)
    } else {
        await scrapeEcharts(page, options.imageFormat, options.outputName);
    }

    browser.close();

});


async function scrapeEcharts(document, imageFormat, outputName){
    const numberOfCharts = await countCharts(document);
    console.log(chalk.cyan("Found ") + chalk.bold.green(numberOfCharts) +
                chalk.cyan(" echarts."));

    var barOpts = {
        width: 20,
        total: numberOfCharts,
        clear: true
    };
    var bar = new ProgressBar(chalk.cyan('Scrappinging [:bar] :percent :etas'),
                              barOpts);
    for(i=0; i<numberOfCharts; i++){
        const dataurl = await getAChart(document, imageFormat, i);
        saveDataUrl(dataurl, i, outputName);
        bar.tick(1);
    }

};


var __count_charts__ = () => {
    var echarts =  document.querySelectorAll('div[_echarts_instance_]');
    return echarts.length;
}

var __get_chart__ = (args) => {
    var ele =  document.querySelectorAll('div[_echarts_instance_]');
    var mychart = echarts.getInstanceByDom(ele[args.index]);
    return mychart.getDataURL({type:args.image_format,
                               excludeComponents: ['toolbox']});
}

async function countCharts(page){
    return await page.evaluate(__count_charts__);
}


async function getAChart(page, imageFormat, index){
    var args = {
        image_format: imageFormat,
        index: index
    }
    return page.evaluate(__get_chart__, args);
}


function saveDataUrl(dataurl, index, outputName){
    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var matches = dataurl.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = new Buffer(data, 'base64');
    fs.writeFileSync(outputName + '.' + index + '.' + ext, buffer);
}


module.exports = {
    snapshot: takeSnapshots
};
