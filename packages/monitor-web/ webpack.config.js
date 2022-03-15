const path = require('path');
module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()], // 移除 node 模块不打包
  entry: path.join(__dirname,'./src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
}