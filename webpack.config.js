const path = require('path');

module.exports = {
  entry: ['./src/index.js', '/src/chessBoard.js', './src/chessPiece.js', './src/app.js'],  // Entry point for your code
  output: {
    filename: 'bundle.js',  // The bundled file to be created
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development',  // Use 'production' for production builds,
  watch: true
};
