const path = require('path');

module.exports = {
    entry: './src/webview/index.jsx', // Entry point for the React app
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'bundle.js' // Output bundle file
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/, // Add this rule
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
