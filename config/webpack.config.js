import commons from 'webpack/lib/optimize/CommonsChunkPlugin';

let dev = {
  entry: {
    home: './lib/client/js/pages/home.js',
    projects: './lib/client/js/pages/projects.js',
    post: './lib/client/js/pages/post.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/webpack/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass'] },
      { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  sassLoader: {
    sourceMap: true
  },
  plugins: [
    new commons('commons.js', ['home', 'projects', 'post'])
  ]
}

let prod = {
  entry: {
    home: './lib/client/js/pages/home.js',
    projects: './lib/client/js/pages/projects.js',
    post: './lib/client/js/pages/post.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/webpack/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css?minimize' },
      { test: /\.scss$/, loaders: ['style', 'css?minimize', 'sass'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  sassLoader: {
    sourceMap: true,
    outputStyle: 'compressed'
  },
  plugins: [
    new commons('commons.js', ['home', 'projects', 'post'])
  ]
}

export default {
  dev: dev,
  prod: prod
}
