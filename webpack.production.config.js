/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const nib = require('nib');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',

  entry: [
    path.join(__dirname, 'src/index.jsx')
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'main',
          test: /\.(css|styl)$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      HEAD_COMMIT: null,
      NODE_ENV: 'production',
      PANOPTES_API_HOST: null
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      gtm: '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-WDW6V4" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-WDW6V4");</script>'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.css'],
    modules: ['.', 'node_modules'],
    fallback: {
      fs: false,
      // for markdown-it plugins
      path: require.resolve('path-browserify'),
      util: require.resolve('util'),
      url: require.resolve('url'),
      process: false
    }
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(markdown-it-anchor|markdown-it-table-of-contents)\/).*/,
      // markdown-it-anchor and markdown-it-table-of-contents are written in ES6 and aren't properly compiled
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.styl$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            import: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        }
      ]
    }, {
      test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff\d?)$/,
      use: [{
        loader: 'file-loader'
      }, {
        loader: 'image-webpack-loader'
      }]
    }]
  }
};
