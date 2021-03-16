/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nib = require('nib');

module.exports = {
  devtool: 'eval-source-map',

  mode: 'development',

  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],

  devServer: {
    historyApiFallback: true,
    host: process.env.HOST || "localhost",
    open: true,
    overlay: true,
    port: 3000
  },

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new DashboardPlugin({ port: 3001 }),
    new webpack.EnvironmentPlugin([
      'HEAD_COMMIT',
      'NODE_ENV',
      'PANOPTES_API_HOST'
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: '',
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: ['.', 'node_modules'],
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: 'babel-loader',
    }, {
      test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
      use: 'file-loader',
    }, {
      test: /\.svg$/,
      loader: 'babel!react-svg',
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }],
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'stylus-loader',
        options: {
          use: [nib()],
        },
      }],
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            import: true
          }
        }]
      }],
  },
  node: {
    fs: 'empty',
  },
};
