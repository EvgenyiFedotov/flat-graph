const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('.');

module.exports = webpack.buildConfig([
  [
    'output',
    webpack.outputByPath({
      path: path.join(__dirname, '../dist/client'),
    }),
  ],
  ['resolve', webpack.resolve],
  ['module', webpack.module],
  {
    entry: { main: './src/client' },
    mode: webpack.mode(),
    plugins: [new CopyPlugin([{ from: './public', to: '.' }])],
    devServer: {
      index: '', // specify to enable root proxying
      proxy: {
        context: () => true,
        target: 'http://localhost:5000',
      },
      // host: 'localhost',
      // port: 5000,
      // contentBase: path.join(__dirname, '../dist/client'),
      // writeToDisk: true,
    },
  },
]);
