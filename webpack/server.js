const path = require('path');
const webpack = require('.');

module.exports = webpack.buildConfig([
  ['output', webpack.outputByPath({
    path: path.join(__dirname, '../dist/server'),
  })],
  ['resolve', webpack.resolve],
  ['module', webpack.module],
  {
    entry: { index: './src/server' },
    mode: webpack.mode(),
    target: 'node',
    externals: ['uws'],
    stats: {
      warnings: false,
    },
  },
]);
