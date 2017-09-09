# Echarts Scraper Puppeteer

[![Build Status](https://travis-ci.org/chfw/echarts-scrappeteer.svg?branch=master)](https://travis-ci.org/chfw/echarts-scrappeteer) [![codecov](https://codecov.io/gh/chfw/echarts-scrappeteer/branch/master/graph/badge.svg)](https://codecov.io/gh/chfw/echarts-scrappeteer)


## Introduction

It scrapes all echarts found in a web page as images. And it scrapes 3D charts too.

## Example

![demo](https://github.com/chfw/echarts-scrappeteer/raw/master/demo.gif)


Here is the command for your discretion:

```
$ scrappeteer https://chfw.github.io/echarts-china-cities-js/preview.html
```

## Gallery

[![step count](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/step-count.png)](http://gallery.echartsjs.com/editor.html?c=calendar-effectScatter)
[![pig plan](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/pig-plan.png)](http://gallery.echartsjs.com/editor.html?c=xByUX8HuDZ)
[![surface wave](https://github.com/chfw/echarts-scrappeteer/raw/master/scraped-gallery/surface-wave.png)](http://gallery.echartsjs.com/editor.html?c=xHkcYXm9pe)

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

## LICENSE

ISC
