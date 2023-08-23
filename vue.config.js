// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require("compression-webpack-plugin")
console.log(process.env.NODE_ENV)
module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : "/vue-admin-work-x",
  publicPath: '/',
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: 5567,
    open: true,
    proxy: {
      // 配置反向代理
      '/api': {
        target: 'http://localhost:9999', // 接口的基础URL
        changeOrigin: true, // 是否改变原始主机头为目标URL
        pathRewrite: {
          '^/api': '', // 如果接口路径中有前缀 '/api'，将其重写为空
        },
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css/,
          threshold: 50240,
          deleteOriginalAssets: false
        }))
    }
  }
};
