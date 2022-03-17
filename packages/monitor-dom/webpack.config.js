const path = require('path');
module.exports = {
  entry: path.join(__dirname,'./src/index.js'),
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: {
      name: 'monitor-dom',
      type: 'umd',
    },
  },
  optimization:{
    usedExports: false,
  },
}