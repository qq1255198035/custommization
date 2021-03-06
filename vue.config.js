const path = require("path");
const webpack = require('webpack');
function resolve(dir) {
      return path.join(__dirname, dir)
}
module.exports = {
      publicPath: './',
      productionSourceMap: false,
      css: {
            loaderOptions: {
                  less: {
                        modifyVars: {
                              'btn-default-bg': 'rgba(255,255,255,0.3)',
                              'link-color': '#fff',
                              'border-radius-base': '4px',
                              'text-color': '#666',
                              'table-header-bg': 'rgba(255,255,255,0)',
                              'table-row-hover-bg': 'rgba(255,255,255,0.3)',
                              'table-header-color': '#fff',
                              'menu-bg': 'rgba(255,255,255,0)',
                              'menu-item-active-border-width': 0,
                              'menu-item-active-bg': 'rgba(255,255,255,1)',
                              'menu-item-color': '#fff',
                              'input-bg': 'rgba(255,255,255,0.3)',
                              'menu-highlight-color': '#fff',
                              'input-hover-border-color': '#3BB9B5',
                              'checkbox-check-color': '#3BB9B5',
                              'checkbox-color': '#fff',
                              'outline-color': '#fff',
                              'primary-color': '#3BB9B5',
                              'btn-primary-color': '#fff',
                              'btn-primary-bg': '#33b8b3',
                              'btn-border-radius-base': '10px',
                              'btn-disable-color': 'rgba(40,181,177,0.5)',
                              'btn-disable-border': 'rgba(40,181,177,0.5)',
                              'btn-disable-bg': '#fff',
                              
                        },
                        javascriptEnabled: true
                  }
            }
      },
      chainWebpack: config => {
            config.resolve.alias
                  .set("@$", resolve("src"))
                  .set("@api", resolve("src/api"))
                  .set("@assets", resolve("src/assets"))
                  .set("@comp", resolve("src/components"))
                  .set("@views", resolve("src/views"))
                  .set("@layout", resolve("src/layout"))
                  .set("@static", resolve("src/static"))
                  .set('@lang', resolve('src/lang'))
      },
      configureWebpack: {
            plugins: [
                  new webpack.ProvidePlugin({
                        introJs: ['intro.js', 'introJs']
                  })
            ],
            //警告 webpack 的性能提示
            performance: {
                  hints:'warning',
                  //入口起点的最大体积
                  maxEntrypointSize: 50000000,
                  //生成文件的最大体积
                  maxAssetSize: 30000000,
                  //只给出 js 文件的性能提示
                  assetFilter: function(assetFilename) {
                        return assetFilename.endsWith('.js');
                  }
            }

      },
      devServer: {
            port: 3000,
            proxy: {
                  '/jeecg-boot': {
                        target: process.env.NODE_ENV == 'production' ? '' : 'http://192.168.0.145:8080',
                        //target: 'http://192.168.0.9:8080',
                        ws: false,
                        changeOrigin: true
                  },
            }
      },
      lintOnSave: undefined
}
