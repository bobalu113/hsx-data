var path = require('path');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      { test: /\.jst$/, 
        loader: "jst-loader" 
      },
      { test: /\.scss$/, 
        loaders: ["style-loader", 
                  "css-loader", 
                  "resolve-url-loader",
                  "sass-loader?sourceMap"
                   + "&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
                   + "&includePaths[]=" + path.resolve(__dirname, "./node_modules/bootstrap-sass/assets/stylesheets")
                   + "&includePaths[]=" + path.resolve(__dirname, "./node_modules/font-awesome/scss")
                 ]
      },
      { test: /\.css$/, 
        loaders: ["style-loader", 
                  "css-loader"
                   + "?root=" + path.resolve(__dirname, "./node_modules/react-bootstrap-daterangepicker/css")
                 ]
      },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader",
        options: {
          name: "fonts/[hash].[ext]",
          limit: 10000,
          mimetype: "application/font-woff"
        } 
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader",
        options: {
          name: "fonts/[hash].[ext]"
        } 
      }
    ]
  },
  resolveLoader: {
    root: path.resolve(__dirname, 'node_modules')
  },
  entry: {
    app: ["./src/js/Bootstrap.js"]
  },
  output: {
    publicPath: "/assets/",
    filename: "bundle.js",
    path: __dirname + '/public/assets/'
  },
  watchOptions: {
    poll: true
  }
};
