const path = require('path');

module.exports = {
  entry: ['./dist/index.js', '/dist/chessBoard.js', './dist/chessPiece.js', './dist/app.js'],  // Entry point for your code
  output: {
    filename: 'bundle.js',  // The bundled file to be created
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development',  // Use 'production' for production builds,
  watch: true
};
