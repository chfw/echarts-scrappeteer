# echarts-scrappeteer

[![Build Status](https://travis-ci.org/chfw/echarts-scrappeteer.svg?branch=master)](https://travis-ci.org/chfw/echarts-scrappeteer) [![codecov](https://codecov.io/gh/chfw/echarts-scrappeteer/branch/master/graph/badge.svg)](https://codecov.io/gh/chfw/echarts-scrappeteer)


## Introduction

It scraps all echarts found in a web page as images. And it scraps 3D charts too.

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

```
$ scrappeteer https://chfw.github.io/echarts-china-cities-js/preview.html
Found 363 echarts
```

## LICENSE

ISC
