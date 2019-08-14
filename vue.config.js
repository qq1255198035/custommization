const path = require("path");

function resolve(dir) {
      return path.join(__dirname, dir)
}
module.exports = {
      publicPath: "./",
      css: {
            loaderOptions: {
                  less: {
                        modifyVars: {
                              'btn-default-bg': 'rgba(255,255,255,0.5)',
                              'border-color-base': 'rgba(255,255,255,0.5)',
                              'link-hover-color': '#fff',
                              'link-color': '#fff',
                              'border-radius-base': '4px',
                              'text-color': '#fff',
                              'table-header-bg': 'rgba(255,255,255,0)',
                              'table-row-hover-bg': 'rgba(255,255,255,0.3)',
                              'table-header-color': '#fff',
                              'menu-bg': 'rgba(255,255,255,0)',
                              'menu-item-active-border-width': 0,
                              'menu-item-active-bg': 'rgba(255,255,255,0.3)',
                              'input-bg': 'rgba(255,255,255,0.3)',
                              'input-hover-border-color': '#fff',
                              'checkbox-check-color': 'rgba(255,255,255,1)',
                              'checkbox-color': 'rgba(255,255,255,0.3)',
                              'outline-color': '#fff',
                              'primary-color': '#fff'
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
                  .set("@static", resolve("src/static"));
      }
}