const rewire = require('rewire');
const fs = require('fs');
const path = require('path');
var assert = require('assert');
const sinon = require('sinon');


var scrappeteer = rewire(path.join(process.cwd(), 'src', 'scrappeteer.js'));

const p = require('puppeteer');
var browser = {
  newPage: () => {
    var page = {
      goto: sinon.spy(),
      waitForNavigation: sinon.spy(),
      setViewport: sinon.spy(),
      mainFrame: function(){
	var mainFrame = {
	  childFrames: function(){
	    return ['fake child frame'];
	  }
	}
	return mainFrame;
      }
    };

    return page;
  },
  close: sinon.spy()
}
var launch = sinon.stub(p, 'launch');
launch.returns(browser);


describe('Scrappeteer', function(){

  it('should save data url as image', function(){
    var saveDataUrl = scrappeteer.__get__('saveDataUrl');
    var testFixture = path.join(process.cwd(), 'test', 'google.data.url.txt');
    fs.readFile(testFixture, "utf8", function read(err, data){
      if (err) {
	throw err;
      }
      saveDataUrl(data.trim(), 1, 'output');
      var status = fs.existsSync('output.1.png');
      assert.equal(status, true);
      fs.unlink('output.1.png', (err) => {});
    });
  });

  it('should count the number of charts', function(){
    var countCharts = scrappeteer.__get__('countCharts');
    var page = {
      evaluate: () => {}
    };
    var stub = sinon.stub(page, 'evaluate');
    stub.onCall(0).resolves(1);

    countCharts(page).then( (count)=>{
      assert.equal(count, 1);
    }).catch((e)=>{});

  });

  it('should get a chart', function(){
    var getAChart = scrappeteer.__get__('getAChart');
    var page = {
      evaluate: () => {}
    };
    var stub = sinon.stub(page, 'evaluate');
    stub.onCall(0).resolves(1);

    getAChart(page, 'png', 1).then( (count)=>{
      assert.equal(count, 1);
    });
  });

  it('should record gif animation', function(){
    var recordGif = scrappeteer.__get__('recordGif');
    var page = {
      screenshot: function(){
        return fs.readFileSync(path.join(process.pwd, 'test', 'test.png'));
      }
    }
    recordGif(page, 'hello', undefined, 1);
  });

  it('should scrape many echarts', function(){
    var scrapeEcharts = scrappeteer.__get__('scrapeEcharts');
    /* Note: the following three statement is permanent */
    scrappeteer.__set__('countCharts', sinon.stub().returns(10));
    scrappeteer.__set__('getAChart', sinon.stub().returns(0));
    scrappeteer.__set__('saveDataUrl', sinon.stub().returns(0));
    scrapeEcharts('fake page', 'png', 'output');
  });


  describe('should take snapshots', function(){

    it('from normal file/link', function(){
      scrappeteer.snapshot('url', 'png', 'output');
    });

    it('on echarts gallery', function(){
      scrappeteer.snapshot('http://gallery.echartsjs.com/echart', 'png', 'output');
    });

    it(' of gif animation', function(){
      scrappeteer.__set__('recordGif', sinon.stub().returns(0));
      scrappeteer.snapshot('url', 'gif', 'output');
    });

  });

});
