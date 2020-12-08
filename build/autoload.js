'use strict';

const path = require('path');
const basePath = require('./path');
const fileHandle = require('./fileHepler');
const fs = require("fs");
const clog = require('./clog');

/**
 * 递归创建目录
 * @param dirname
 * @returns {boolean}
 */
const mkdirsSync = dirname => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};


let autoload = {


  /**
   * @description 自动加载模块
   * @param dir 加载路径
   * @param desc 描述
   * @param flieType 加载文件类型
   * @param type 加载返回数据类型（Object|Array）
   */
  createAutoload: function (dir, flieType=['js'], type = "object", desc='Utils',) {
    let autoladFile = fileHandle.getDirFiles(dir, flieType, ['.bak','autoload']),
        importStr = '',
        exportStr = '',
        count = 0;

    Object.keys(autoladFile).forEach((file) => {
      /**多层关系加载**/
      if (file.indexOf('bak') === -1) {
        let moduleName = this.handleFile(file);
        let modulePath = file;

        let str = '';
        if (count === 0) {
          str = `import ${moduleName} from './${modulePath}';`;
          exportStr += `${moduleName}`;
        } else {
          str = `
import ${moduleName} from './${modulePath}';`;
          exportStr += `,
  ${moduleName}`;
        }
        importStr += str;
        count++;
      }
    });

    /**读取文件，并替换文件内容**/
    let buffer = fs.readFileSync(path.join(basePath.buildTemplateDirectory, 'autoload.txt'));
    let content = String(buffer);
    if(type === 'object') {
      exportStr = `{
      ${exportStr}
      }`;
    }
    if (type === 'array') {
      exportStr = `[
  ${exportStr}
]`;
    }
    content = content.replace(/@import_modules@/g, importStr);
    content = content.replace(/@modules_name@/g, exportStr);

    /**写文件**/
    let fd = fs.openSync(path.join(dir, 'autoload.js'), 'w');
    fs.writeFileSync(fd, content);
    fs.closeSync(fd);
    clog(`\n\n\n${desc} 加载完成，path:${path.join(dir, 'autoload.js')}`,'green');
  },

  handleFile(path) {
    if (path.indexOf('/') !== -1) {
      let temp = '';
      let arr = path.split('/');
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        if (i === 0) temp = arr[i];
        else temp += arr[i].replace(arr[i][0], arr[i][0].toLocaleUpperCase());
      }
      return temp;
    } else {
      return path;
    }
  },
};

module.exports = autoload;

