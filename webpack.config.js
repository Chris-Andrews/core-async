module.exports = {
  entry: {
    "./src/api-wrapper"
  },
  output: {
    filename: "./build/core-async.js"
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
