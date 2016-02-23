
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import jsbeautify = require('js-beautify');

export function format(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions) {

    if (range === null) {
        var start = new vscode.Position(0, 0);
        var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }

    var result: vscode.TextEdit[] = [];

    var content = document.getText(range);

    if (!options) {
        options = { insertSpaces: true, tabSize: 4 };
    }

    var beatiFunc = null;

    switch (document.languageId) {
        case 'css':
            beatiFunc = jsbeautify.css;
            break;
        case 'javascript':
            beatiFunc = jsbeautify.js;
            break;
        case 'html':
            beatiFunc = jsbeautify.html;
            break;
        default:
            break;
    }
    if(!beatiFunc) return;
    
    var beutifyOptions: jsbeautify.options = {
        indent_char: options.insertSpaces ? ' ' : '\t',
        indent_size: options.insertSpaces ? options.tabSize : 1,
        selector_separator_newline: false
    }

    var formatted = beatiFunc(content, beutifyOptions);
    if (formatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }

    return result;
};


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    var docType: Array<string> = ['css', 'javascript', 'html'];

    for (var i = 0, l = docType.length; i < l; i++) {
        registerDocType(docType[i]);
    }

    function registerDocType(type) {
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(type, {
            provideDocumentFormattingEdits: (document, options, token) => {
                return format(document, null, options)
            }
        }));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
            provideDocumentRangeFormattingEdits: (document, range, options, token) => {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                return format(document, new vscode.Range(start, end), options)
            }
        }));
    }
}