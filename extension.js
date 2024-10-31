// The module 'vscode' contains the VS Code extensibility API

// const path = require('path');

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('logreader.logReader', function () {
		const panel = vscode.window.createWebviewPanel(
			'textField', // Identifies the type of the webview. Used internally
			'Logger', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in
			{ enableScripts: true }
		);

		panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(webview, extensionUri) {
	// Use webview's API to convert the file path into a resource URI
	const bundleJsUri = webview.asWebviewUri(
		vscode.Uri.joinPath(extensionUri, 'out', 'bundle.js')
	);

	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>React Text Field</title>
		</head>
		<body>
				<div id="root"></div>
				<script src="${bundleJsUri}"></script>
		</body>
		</html>
	`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
