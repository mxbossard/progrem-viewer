const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('bundle.min.css')

module.exports = {
  devtool: 'inline-source-map',
  watch: true,
  mode: 'development',
  //mode: 'production',
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    //filename: '[name].[contenthash:8].js',
    filename: '[name].bundle.js',
  },
  entry: {
    index: './src/index.ts',
    'bundle.css': [
      __dirname + '/src/styles.css',
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: extractCSS.extract({
          use: {
            loader: 'css-loader',
            options: {
            }
          }
        })
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.ejs' }),
    new Visualizer({ filename: './statistics.html' }),
    extractCSS
  ],
};