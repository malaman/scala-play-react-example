const webpack = require('webpack');
const path = require('path');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'target/scala-2.12/weather-app-fastopt.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              includePaths: [
                path.resolve('./node_modules/react-select/dist/react-select.css'),
                path.resolve('./node_modules/weather-icons/css/weather-icons.min.css')
              ]
            }
          }
        ]
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use : [
          {
            loader: 'file-loader',
            options: {
              includePaths: [
                path.resolve('./node_modules/weather-icons/font')
              ]
            }
          }
        ]
      }

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './assets/index.html', to: 'index.html' }
    ])
  ]
};