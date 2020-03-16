const path = require('path');
const webpack = require('webpack');
require('dotenv').config()
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const fs = require('fs');

// Html files only
let htmlOnly = item => /(\.njk)$/.test(item);

// auto page generator
function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  const filteredTemplateFiles = templateFiles.filter(htmlOnly);

  return filteredTemplateFiles.map(item => {
    const extension = 'njk';
    const name = item.replace(/(\.njk)$/, '');

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
      showErrors: null
    })
  }).concat([new HtmlBeautifyPlugin(
    {
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_with_tabs: true,
          indent_inner_html: true,
          preserve_newlines: false
        }
      }
    })
  ]);
};

const htmlPlugins = generateHtmlPlugins('./src/html');

module.exports = {
  entry: [  // webpack entry point.
    './src/index.js',
    './src/styles/index.sass',
    // './src/styles/loader.sass'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),  // folder to store generated bundle
    filename: './bundle.script.js'  // name of generated bundle after build
  },

  devtool: "source-map",  // source Maps

  module: {  // where we defined file patterns and their loaders
    rules: [

      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // styles sass/scss
      {
        test: /\.(sa|sc|c)ss$/,
        use: [  
          {
            loader: 'file-loader',
            options: {
              name: './styles/[name].css',
              context: './'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      // nunjucks templates
      {
        test: /\.njk|nunjucks/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: {
                minimize: false,
                removeComments: false,
                collapseWhitespace: false
              }
            }
          },
          { // use html-loader or html-withimg-loader to handle inline resource
            loader: 'nunjucks-webpack-loader' // add nunjucks-webpack-loader
          },
        ]
      },
    ]
  },

  plugins: [  // array of plugins to apply to build chunk
    new webpack.DefinePlugin({  // plugin to define global constants

      // Change the path to the includes folder in the .env file
      INCLUDES_PATH: JSON.stringify(process.env.INCLUDES_PATH),
      DATE: Date.now(0)
    }),
    
    new CleanWebpackPlugin({
      dry: true,
      cleanOnceBeforeBuildPatterns : []
    }),  // Clear the dist folder

    new CopyWebpackPlugin([  
      {  // copy static files
        from: './src/static',
        to: './',
        ignore: ['*.md']
      }
    ])
  ].concat(htmlPlugins), // auto page generator

  devServer: {  // configuration for webpack-dev-server
    liveReload: true,
    hot: false,
    watchContentBase: true,
    host: "localhost", // host to run dev-server
    port: 80, // port to run dev-server
    open: false  // open page at server startup
  } 
};
