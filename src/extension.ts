
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

    var formatted = beatify(content, document.languageId, options);

    if (formatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }

    return result;
};

function beatify(documentContent: String, languageId, options) {

    if (!options) {
        options = { insertSpaces: true, tabSize: 4 };
    }

    var beatiFunc = null;
    switch (languageId) {
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
            vscode.window.showInformationMessage('Sorry, this language is not supported. Only support Javascript, CSS and HTML.');
            break;
    }
    if (!beatiFunc) return;

    var beutifyOptions: jsbeautify.options = {
        indent_char: options.insertSpaces ? ' ' : '\t',
        indent_size: options.insertSpaces ? options.tabSize : 1,
        selector_separator_newline: false
    }

    return beatiFunc(documentContent, beutifyOptions);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    var docType: Array<string> = ['css', 'javascript', 'html'];

    for (var i = 0, l = docType.length; i < l; i++) {
        registerDocType(docType[i]);
    }

    let formatter = new Formatter();

    context.subscriptions.push(vscode.commands.registerCommand('Lonefy.formatting', () => {
        formatter.beautify();
    }));


    function registerDocType(type) {
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(type, {
            provideDocumentFormattingEdits: (document, options, token) => {
                return formatter.registerBeautify()
            }
        }));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
            provideDocumentRangeFormattingEdits: (document, range, options, token) => {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                return formatter.registerBeautify()
            }
        }));
    }


}

class Formatter {


    public beautify() {
        
        // Create as needed
        let window = vscode.window;
        let range, options;
        // Get the current text editor
        let activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }

        let document = activeEditor.document;

        if (range === null) {
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }

        var result: vscode.TextEdit[] = [];

        var content = document.getText(range);



        var formatted = beatify(content, document.languageId, options);
        if (formatted) {
            return activeEditor.edit(function(editor) {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                return editor.replace(range, formatted);
            });
        }

    }

    public registerBeautify() {
        
        // Create as needed
        let window = vscode.window;
        
        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            return;
        }

        let document = editor.document;


        var start = new vscode.Position(0, 0);
        var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        //const range = new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
        return format(document, new vscode.Range(start, end), null);


    }

    dispose() {
    }
}