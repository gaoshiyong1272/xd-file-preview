'use strict';

const settings = {
  /**
   * @type {string}
   * @description 项目名称
   */
  title: '',

  /**
   * @type {string}
   * @description  系统版本
   */
  version: 'v1.0.0',

  /**
   * @type {boolean}
   * @description  是否关闭eslint语法检测
   */
  isCloseEslint: false,

  /**
   * @type {boolean} true | false
   * @description 开发环境与生产环境
   */
  isDebug: false,

  /**
   * @type {boolean} true | false
   * @description 是否加载模拟数据
   */
  isTestData: false,

  /**
   * @type {number}
   * @description  开发环境端口号
   */
  port: 8057,

}

module.exports = settings;


