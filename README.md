# apb-cli
Command line tool for developing APB CSS (Atomic Parts Base CSS)

**APB CSS**
http://apbcss.com/


## What is this？
APBCSS Assets File 生成の為のコマンドラインツールです。


## Install

**Install with [npm](https://www.npmjs.com):**

```
npm install -g @atomic-package/apb-cli
```


## usage

**Default Usage**

```
apb new
```

scssフォルダを基に、各ファイルが生成されます。

**Designation Folder Name**

```
apb new [appName]
```

任意のフォルダ名を指定できます。


**Designation Create Path**


```
apb new [appName] --path=path
```

任意の生成パスを指定できます。


### Generate Command


**Default Usage**

```
apb generate [assetsType]
```

or

```
apb --generate [assetsType]
```

**Shortcut**

```
apb -g [assetsType]
```

### Assets Type

| AssetsType Name | Details    |
|:----------------|:-----------|
| base            | アプリケーションのbaseとなるstyleが定義されているファイル群      |
| pages           | アプリケーションの各ページ固有のstyleが定義されているファイル群       |
| parts           | APBCSSのcoreとなる各パーツのstyleが定義されているファイル群       |



### What's included

```
scss/
├── base/
│   ├── _base.scss
│   ├── _mixin.scss
│   ├── _reset.scss
│   └── _setting.scss
├── pages/
│   ├── _index.scss
│   └── _pages_inc.scss
├── parts/
│   ├── _animation.scss
│   ├── _base.scss
│   ├── _bg.scss
│   ├── _box.scss
│   ├── _button.scss
│   ├── _footer.scss
│   ├── _form.scss
│   ├── _header.scss
│   ├── _icon.scss
│   ├── _list.scss
│   ├── _media_queries.scss
│   ├── _modal.scss
│   ├── _navigation_menu.scss
│   ├── _paragraph.scss
│   ├── _separate.scss
│   ├── _table.scss
│   └── _title.scss
├── _common_inc.scss
├── _parts.scss
└── style.scss    
    
```

## Creators

**Daisuke Takayama**
* [@webcyou](https://twitter.com/webcyou)
* [@panicdragon](https://twitter.com/panicdragon)
* <https://github.com/webcyou>
* <https://github.com/panicdragon>
* <http://www.webcyou.com/>

## Copyright and license
MIT



