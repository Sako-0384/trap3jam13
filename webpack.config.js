const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist/js/'),
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.(ts)$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
