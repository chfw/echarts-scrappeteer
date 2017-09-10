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
  Usage: scrappeteer [options] <url/file>


  Options:

    -f, --format <png/jpeg>    image format
    -o, --output <outputname>  output file name
    -h, --help                 output usage information
```

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


![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.0.png)
![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.1.png)
![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.2.png)
![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.3.png)
![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.4.png)
![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.5.png)
![scrape pyecharts](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/output.6.png)


## Gallery

[![step count](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/step-count.png)](http://gallery.echartsjs.com/editor.html?c=calendar-effectScatter)
[![pig plan](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/pig-plan.png)](http://gallery.echartsjs.com/editor.html?c=xByUX8HuDZ)
[![surface wave](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/surface-wave.png)](http://gallery.echartsjs.com/editor.html?c=xHkcYXm9pe)

## LICENSE

ISC
