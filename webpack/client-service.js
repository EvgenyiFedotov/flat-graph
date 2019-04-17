const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('.');

module.exports = webpack.buildConfig([
  ['output', webpack.outputByPath({
    path: path.join(__dirname, '../dist/client'),
  })],
  ['resolve', webpack.resolve],
  ['module', webpack.module],
  {
    entry: { service: './src/client/service' },
    mode: webpack.mode(),
    target: 'node',
    externals: ['uws'],
  },
]);
