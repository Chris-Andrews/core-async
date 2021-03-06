module.exports = {
  // entry: "./examples/core-async-api/scratch.js",
  entry: {
    'mouse-demo': './src/mouse-demo.js',
  },
  output: {
    path: __dirname + '/build',
    publicPath: "/",
    filename: '[name].bundle.js',
  },
  module: {
  loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          optional: 'runtime',
          stage: 0
        }
      }
    ]
  }
}
