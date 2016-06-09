var webpack = require('webpack')
var webpackConfig = require("./webpackConfig")

function createDist(entries, outputPath){
  console.log("wooo")
  webpack(webpackConfig(entries, outputPath), function(err, stats) {
    console.log(err)
    console.log(stats)
  });
}

module.exports = createDist;
