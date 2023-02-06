const path = require('path');

module.exports = {
  // Entry point for the application
  entry: './src/index.js',
  // Output configuration
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      "util": require.resolve("util/")
    }
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
