const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const args = process.argv.slice(2);

const checkConfig = (config, params = {}) => (
  config instanceof Function
    ? config(params)
    : config
);

const buildBlockConfig = (key, config, params = {}) => ({
  [key]: checkConfig(config, params),
});

const output = () => ({
  chunkFilename: '[name].js',
  filename: '[name].js',
});

module.exports = {
  output,

  outputByPath: ({ path }) => ({
    ...output(),
    path,
  }),

  resolve: () => ({
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    modules: ['node_modules'],
  }),

  module: () => ({
    rules: [{
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/i,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['@babel/env', {
              modules: false,
            }],
            '@babel/typescript',
            '@babel/react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  }),

  optimization: () => ({
    minimizer: [new UglifyJsPlugin({
      cache: true,
      sourceMap: true,
    })],
  }),

  buildConfig: (listConfigs, params = {}) => (
    listConfigs.reduce((res, config) => ({
      ...res,
      ...(
        (config instanceof Array && config.length)
          ? buildBlockConfig(config[0], config[1], params)
          : checkConfig(config, params)
      ),
    }), {})
  ),

  mode: () => (
    args.indexOf('--prod') === -1
      ? 'development'
      : 'production'
  ),

  checkConfig,

  buildBlockConfig,
};
