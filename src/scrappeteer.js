const fs = require('fs');
const p = require('puppeteer');
const path = require('path');
const ProgressBar = require('progress');
const chalk = require('chalk');


const ECHARTS_GALLERY = 'http://gallery.echartsjs.com/';


var takeSnapshots = (async (urlOrFile, imageFormat, outputName, wait) => {
    var timeout = 30 * 1000;
    if(urlOrFile.indexOf("http") == -1 && urlOrFile.indexOf("file://") == -1){
        urlOrFile = 'file://' + path.join(process.cwd(), urlOrFile);
    }

    const browser = await p.launch({headless: false, args:['--start-maximized']});
    const page = await browser.newPage();
    if(urlOrFile.indexOf(ECHARTS_GALLERY) != -1){
        timeout = 60 * 1000;
        await page.setViewport({width: 1300, height: 800});
    }
    await page.goto(urlOrFile, {waitUtil: 'networkidle', timeout: timeout});

    try{
        await page.waitForNavigation({timeout: wait});
    }catch(e){
    }

    const mainFrame = page.mainFrame();
    if(mainFrame.url().indexOf(ECHARTS_GALLERY) != -1){
        const childFrames = mainFrame.childFrames();
        await scrape_echarts(childFrames[0], imageFormat, outputName);
    } else {
        await scrape_echarts(page, imageFormat, outputName);
    }

    browser.close();

});


async function scrape_echarts(document, imageFormat, outputName){
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
