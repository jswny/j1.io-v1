import commons from 'webpack/lib/optimize/CommonsChunkPlugin';

let master = {
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
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
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
  dev: master,
  prod: master
}
