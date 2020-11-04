## VS Code JS, CSS, HTML Formatting

This extension uses [js-beautify](https://github.com/beautify-web/js-beautify) to format your JS, CSS, HTML, and JSON files.

## How To Use

*  Open `Context Menu` and choose `Format Code`
*  Shortcut: `Alt+Shift+F`
*  CLI: Press `F1`, enter `Format Code`

> The above ways don't work for `Javascript` & `JSON` after VSCode `v0.10.10`, but you can still format `CSS` and `HTML`.

### To format **Javascript, CSS and HTML** after vscode v0.10.10
*  CLI: Press `F1`, enter `Formatter`

## Config

1. Press `F1`, enter `Formatter Config`, and open the config file:

   ![image](https://cloud.githubusercontent.com/assets/7921431/15070016/2bf251a4-13b4-11e6-8ebe-eefaa6adcbf6.png)

2. This extension uses `js-beautify` internally, so you can edit the settings to your liking.

   ![image](https://cloud.githubusercontent.com/assets/7921431/15069887/47ee136c-13b3-11e6-9505-4a3b378be601.png)

3. Restart VSCode.

## License
[MIT](https://github.com/lonefy/vscode-js-css-html-formatter/blob/master/LICENSE)

## Bugs and Issues
View the list of unsolved issues [here](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues).
Or, [submit a bug report](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/new/choose).

## Change Log
### 0.2.3 31 Mar 2017
* (BUG FIX): Fixed the saving problem.

### 0.2.2 23 Nov 2016
* (BUG FIX): Fixed the save loop problem [(Issue #20)](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/20) with the `onSave` feature.
* New VSCode API changes [(Issue #30)](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/30);

### 0.2.0 20 July 2016
* New Feature: SCSS support [(Issue #14)](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/14)

### 0.1.32 15 July 2016
* (BUG FIX) Path is undefined
* ES6/ES7 Import Syntax [(Issue #9)](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/9)

### 0.1.3 06 May 2016
* New Feature: `onSave` configuration option (default: `true`) [(Issue #4)](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/4)
* New Feature: Local config file. [(Issue #3)](https://github.com/Lonefy/vscode-JS-CSS-HTML-formatter/issues/3)
    
    Use `F1 -> Formatter Create Local Config` to generate the local config file in the `.vscode folder` of your project. The formatter will use the **local config file** first.
   
* Added support for `JSON` files.

### 0.1.0 26 Mar 2016
* Added configuration options.

## Thanks to
rjmacarthy, zhaopengme, Arrow7000, bitwiseman
