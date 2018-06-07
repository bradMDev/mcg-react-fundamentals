var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

// FOR PRODUCTION... adds:
// NODE_ENV variable so React knows it has to build for production mode
// and 
// minifies code

var config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.(css)$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'app/index.html'
    })],
    mode: "development"
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      // Tells React we want to use the production version of React (Removes comments, etc.)
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) // 'production'
      }
    }),
    // Minifies all of our code
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;




/* FOR DEVELOPMENT

module.exports = {
  entry: './app/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
  },
  module: {
      rules: [
          { test: /\.(js)$/, use: 'babel-loader' },
          { test: /\.(css)$/, use: [ 'style-loader', 'css-loader' ]}
      ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
      template: 'app/index.html'
  })],
  mode: "development"
}
*/