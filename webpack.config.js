var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: {
    home: './lib/js/home.js',
    projects: './lib/js/projects.js'
  },
  output: {
    path: './public/js/bundles',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  },
  plugins: [
    new CommonsChunkPlugin('commons.js', ['home', 'projects'])
  ]
};