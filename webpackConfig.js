var path = require('path');
var webpack = require('webpack');

function webpackConfig(filePaths, outputPath){
  var entry = {
  }
  filePaths.forEach(function(filePath){
    var fileName = path.parse(filePath).name;
    console.log(fileName)
    entry[fileName] = filePath
  })
  console.log(entry)
  return {

    debug: false,

    entry: entry,

    target: 'async-node',

    devtool: 'source-map',

    output: {
      path: outputPath,
      filename: '[name].js',
      library: 'babel-webpack-package-boilerplate',
      libraryTarget: 'commonjs2'
    },

    resolve: {
      modulesDirectories: [
        'node_modules',
        // 'src/lib'
      ]
    },

    module: {
      loaders: [{
        test: /\.js$/,
        // include: [
        //   path.resolve(__dirname, './src'),
        //   path.resolve(__dirname, './test')
        // ],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0', // Gives use access to propety initializers
          ],
        },
      }]
    }

  }
}

module.exports = webpackConfig;
