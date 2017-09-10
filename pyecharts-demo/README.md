# Read Me

It is intended for pyecharts users who would like to get 3D scrappings or would
like to scrape more than one echarts from pycharts.Page class.

## Quick start

```
$ npm install -g echarts-scrappeteer
$ pip install pyecharts # if you haven't done so
$ python pyecharts-demo.py
```

## How does it work?

echarts-scrappeteer was called from python and does the scraping for you.

```
import os

...
os.system('scrappeteer render.html')
```

If you have supply a `path` parameter to the `render()` function, you need
to give same parameter to `scrappeteer`.


## Does it work with single echart page?

Surely, it does.