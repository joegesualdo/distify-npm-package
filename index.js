var webpack = require('webpack')
var path = require('path');

function webpackConfig(entryFilePath, outputDirectoryPath){
  let entry = {}
  let fileName = path.parse(entryFilePath).name;
  entry[fileName] = entryFilePath

  return {
    // bail: true,
    debug: false,

    entry: entry,

    // target: 'async-node',
    // devtool: 'source-map',
    //
    output: {
      path: outputDirectoryPath,
      filename: '[name].js',
      library: 'babel-webpack-package-boilerplate',
      libraryTarget: 'commonjs2'
    },

    // This was needed to get node programs  to work
    externals: fs.readdirSync("node_modules"),

    resolve: {
      modulesDirectories: [
        'node_modules',
        // 'src/lib'
      ]
    },

    module: {
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

  }
}

function distifyNpmPackage(entryFilePath, outputDirectoryPath){
  webpack(webpackConfig(entryFilePath, outputDirectoryPath), function(err, stats) {
    // Do something
    // console.log(err)
    // console.log(stats.compilation)
  });
}

module.exports = distifyNpmPackage;
