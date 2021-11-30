const path = require('path');

module.exports = {
  entry: {
    'read-gedcom': './dist/es6/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'Gedcom',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
};
