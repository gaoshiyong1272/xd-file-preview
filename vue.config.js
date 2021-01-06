'use strict';

const path = require('path');
const defaultSettings = require('./settings.js');
const devServer = require('./devServer'); //devServer相关配置
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**自动加载关系**/
const CreatedComponentsPlugin = require('./build/plugins/CreatedComponentsPlugin');


function resolve(dir) {
  return path.join(__dirname, dir)
}

/***
 * @description 根据环境入口使用的插件
 * @type {CreatedComponentsPlugin[]}
 */
let plugins = [];
//console.log(process.env.npm_lifecycle_script.indexOf('gxdVue'), process.env);
if(process.env.npm_lifecycle_script.indexOf('gxdVue') !== -1) {
  plugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_debugger: true,  //去掉debugger
        drop_console: true,  // 去掉console
        pure_funcs: ['console.log']// 移除console
      }
    },
    sourceMap: false,
    parallel: true
  }));
}


const name = defaultSettings.title || 'XD Vue Package'; // page title


// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  /**是否关闭eslint语法检测**/
  lintOnSave: defaultSettings.isCloseEslint,
  productionSourceMap: false,

  devServer,
  css: {
    extract: false //设置不产生css样式模式
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    //关闭性能提示
    performance: {
      hints: false,
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    plugins
  },

  chainWebpack: (config) => {

  }
};
