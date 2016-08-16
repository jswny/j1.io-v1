module.exports = {
  entry: "./lib/js/home.js",
  output: {
    path: "./public/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ]
  }
};