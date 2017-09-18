# Echarts Scraper Puppeteer

[![Build Status](https://travis-ci.org/chfw/echarts-scrappeteer.svg?branch=master)](https://travis-ci.org/chfw/echarts-scrappeteer) [![codecov](https://codecov.io/gh/chfw/echarts-scrappeteer/branch/master/graph/badge.svg)](https://codecov.io/gh/chfw/echarts-scrappeteer) [![npm version](https://badge.fury.io/js/echarts-scrappeteer.svg)](https://badge.fury.io/js/echarts-scrappeteer)


## Introduction

It scrapes all echarts found in a web page as images. And it scrapes 3D charts too. Of course, it supports
[pyecharts](https://github.com/chenjiandongx/pyecharts) as well. Please find the example in later section.

## Installation

```shell
$ npm i -g echarts-scrappeteer
```

### requirements

Node 7.6.0 or later

## Usage

```shell

Usage: main [options] <url/file>


Options:

  -f, --format <png/jpeg>                 image format
  -o, --output <outputname>               output file name
  -w, --wait <delay in milli-seconds>     wait a while before scrapping
  -v, --viewPort <width,height>           force puppeteer to set viewport. for echarts gallery site only
  -r, --clipRectangle <x,y,width,height>  record rectangle when making gif animation
  -c, --frameCounts <number>              of frames. gif only
  -i, --frameInterval <number>            frame intervals. gif only
  -s, --skipFrames <number>               skip initial frames. gif only
  -g, --gap time<number>                  between each gif snapshot. gif only
  -h, --help                              output usage information
```

If the page load speed is slow or if the resulting image is partial, `-w` parameter is
required to delay the scrape action.

## Example

### Scrape echarts from a URL

![demo](https://github.com/chfw/echarts-scrappeteer/raw/master/demo.gif)

Here is the command for your discretion:

```
$ scrappeteer https://chfw.github.io/echarts-china-cities-js/preview.html
```

### Scrape echarts from a local file


```shell
$ scrappeteer render.html
```

Where does the `render.html` come from? It is genereted by pyecharts. Please visit [pyecharts-demo.py](https://github.com/chfw/echarts-scrappeteer/blob/master/pyecharts-demo/pyecharts-demo.py). 


![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.4.png)


## Gallery

### Gif format :fire:

```shell
scrappeteer http://gallery.echartsjs.com/editor.html?c=xrkJtnKJq- -w 2000 -f gif -r 525,50,770,750 -o gf3 -i 300 -c 10 -v 1300,800
```

[![high speed route](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/shenzhen.gif)](http://gallery.echartsjs.com/editor.html?c=xrkJtnKJq-)

### Static images

[![step count](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/step-count.png)](http://gallery.echartsjs.com/editor.html?c=calendar-effectScatter)
[![pig plan](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/pig-plan.png)](http://gallery.echartsjs.com/editor.html?c=xByUX8HuDZ)
[![surface wave](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/surface-wave.png)](http://gallery.echartsjs.com/editor.html?c=xHkcYXm9pe)

## LICENSE

ISC
