/* Import */
var fs = require('fs');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/* Update readme and read license */
var version = require('./package.json').version;
var readme = fs.readFileSync('README.md', 'utf-8').replace(
  /cdn\/(.*)\/neataptic.js/, `cdn/${version}/neataptic.js`
);
fs.writeFileSync('README.md', readme);

var license = fs.readFileSync('LICENSE', 'utf-8');

/* Export config */
module.exports = {
  context: __dirname,
  entry: {
    'dist/neataptic': './src/neataptic.js',
    [`mkdocs/theme/cdn/${version}/neataptic`]: './src/neataptic.js'
  },
  output: {
    path: './',
    filename: '[name].js',
    library: 'neataptic',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(license),
    new CopyWebpackPlugin([
      { from: 'src/multithreading/workers/node/worker.js', to: 'dist' }
    ])
  ],
  externals: [
    'child_process'
  ],
  node: {
    __dirname: false
  }
};
