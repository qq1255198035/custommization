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
                              'input-bg': 'rgba(255,255,255,0.3)',
                              'input-hover-border-color': '#3BB9B5',
                              'checkbox-check-color': '#3BB9B5',
                              'checkbox-color': '#fff',
                              'outline-color': '#fff',
                              'primary-color': '#3BB9B5',
                              'btn-primary-color': '#fff',
                              'btn-primary-bg': '#5BA997',
                              'btn-border-radius-base': '10px',
                              'btn-disable-color': 'rgba(40,181,177,0.5)',
                              'btn-disable-border': 'rgba(40,181,177,0.5)',
                              'btn-disable-bg': '#fff'
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
      },
      configureWebpack: {
            plugins: [
                  new webpack.ProvidePlugin({
                        $:"jquery",
                        jQuery:"jquery",
                        "windows.jQuery":"jquery"
                  })
            ]
      },
      devServer: {
            port: 3000,
            proxy: {
             /* '/api': {
                target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                  '/jeecg-boot': ''  //默认所有请求都加了jeecg-boot前缀，需要去掉
                }
              },*/
              '/jeecg-boot': {
                target: 'http://192.168.0.130:8080', //请求本地 需要jeecg-boot后台项目
                //target: 'http://192.168.0.122:8080',
                ws: false,
                changeOrigin: true
              },
            }
          },
        
          lintOnSave: undefined
}