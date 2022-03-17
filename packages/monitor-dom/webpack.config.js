const path = require('path');
module.exports = {
  entry: path.join(__dirname,'./src/index.js'),
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  optimization:{
    usedExports: false,
  }
}