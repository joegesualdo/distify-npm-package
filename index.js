var webpack = require('webpack')
var path = require('path');
var fs = require('fs');

function webpackConfig(entryFilePath, outputDirectoryPath, isModule, isNode, addShebang){
  let entry = {}
  let fileName = path.parse(entryFilePath).name;
  entry[fileName] = entryFilePath

  config = {}
  config.debug = false
  config.entry = entry

  config.output = {
    path: outputDirectoryPath,
    filename: '[name].js',
  }
  config.resolve = {
      modulesDirectories: [
        'node_modules',
      ]
    },
  config.module = {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'stage-0', // Gives use access to propety initializers
          ],
        },
      }
    ]
  }
  config.plugins = [];
  if (isNode) {
    if (addShebang) {
      config.plugins.push(new webpack.BannerPlugin('#!/usr/bin/env node', {raw: true, entryOnly: true}));
    }
    config.target = 'node'
    config.output.libraryTarget = 'commonjs2'
    if (directoryExistsSync("node_modules")) {
      console.log('dir exists')
      config.externals = fs.readdirSync("node_modules")
    }
  }

  if (isModule) {
    config.output.library = 'babel-webpack-package-boilerplate'
    config.output.libraryTarget = 'commonjs2'
    // What is this for?? Node apps?
  }


  return config;
}

function distifyNpmPackage(entryFilePath, outputDirectoryPath, opts){
  opts = opts || {}
  opts.isModule = opts.isModule || false
  opts.isNode = opts.isNode || false 
  opts.addShebang = opts.addShebang|| false 
  webpack(webpackConfig(entryFilePath, outputDirectoryPath, opts.isModule, opts.isNode, opts.addShebang), function(err, stats) {
    if (err || (stats.compilation && stats.compilation.errors && stats.compilation.errors.length > 0)) {
      console.log("----- There were some issues building -----")
      if (err) {
        console.log("Error: " + err)
      }
      if (stats.compilation && stats.compilation.errors && stats.compilation.errors.length > 0) {
        console.log("Compilation Errors:")
        console.log(stats.compilation.errors)
      }
    } else {
      console.log("Successfully Built to '" + path.resolve(outputDirectoryPath) + "' directory.")
    }
  });
}

function fileExistsSync(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

function directoryExistsSync(filePath) {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
}

module.exports = distifyNpmPackage;
