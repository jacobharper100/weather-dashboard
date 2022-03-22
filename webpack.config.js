const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    "mode": "development",
    "entry": "./src/client/index.js",
    "output": {
        "path": __dirname + '/build',
        "filename": "bundle.js"
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.js$/,
                "exclude": /node_modules/,
                "loader": "eslint-loader",
                "options": {
                  "emitWarning": true,
                  "failOnError": false,
                  "failOnWarning": false
                }
            },
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader"
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                "test": /\.html$/,
                "use": [
                    {
                        "loader": "html-loader"
                    }
                ]
            }
        ]
    },
    "plugins": [
        new HtmlWebPackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html"
        })
    ]
}