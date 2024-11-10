const path = require('path');

module.exports = {
  entry: './script.js', // Change to your main JavaScript file
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
