var webpack = require('webpack')
var path = require('path');
var fs = require('fs');

function webpackConfig(entryFilePath, outputDirectoryPath, isModule, isNode){
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

  if (isModule) {
      console.log('woooo')
    config.output.library = 'babel-webpack-package-boilerplate'
    config.output.libraryTarget = 'commonjs2'
    // What is this for?? Node apps?
    if (isNode) {
      // console.log('woooo')
      if (directoryExistsSync("node_modules")) {
        console.log('dir exists')
        config.externals = fs.readdirSync("node_modules")
      }
    }
  }


  return config;
}

function distifyNpmPackage(entryFilePath, outputDirectoryPath, opts){
  opts = opts || {}
  opts.isModule = opts.isModule || false
  opts.isNode = opts.isNode || false 
  webpack(webpackConfig(entryFilePath, outputDirectoryPath, opts.isModule, opts.isNode), function(err, stats) {
    // Do something
    // console.log(err)
    if (stats.compilation.errors.length > 0) {
      console.log("There were error compiling:")
      console.log(stats.compilation.errors)
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
