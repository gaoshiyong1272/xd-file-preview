'use strict';

const requireContext = require('require-context');
const fs = require('fs');

class FileHepler {
  checkVarType(obj) {
    let toString = Object.prototype.toString;
    let map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }

    return map[toString.call(obj)];
  }

  inArray(sourceArray = [], findArray = []) {
    if (this.checkVarType(sourceArray) === 'array' && this.checkVarType(findArray) === 'array') {
      let sourceArraylen = sourceArray.length;
      let find = JSON.parse(JSON.stringify(findArray));
      let temp = [];
      for (let i = 0; i < sourceArraylen; i++) {
        let sourceVal = sourceArray[i];
        for (let k = 0; k < find.length; k++) {
          if (find[k] === sourceVal) {
            temp.push(true);
            find.splice(k, 1);
            break;
          }
        }
      }
      return findArray.length === temp.length;
    } else {
      return false;
    }
  }

  getDirFiles(directory, fileType = [], ignoreFileName = []) {
    /**
     * @description
     * @type {RegExp}
     */
    let reg = new RegExp(`\.(${fileType.join('|')})$`);
    let regFile = new RegExp(`^(.*)\.(${fileType.join('|')})$`);
    let modulesFiles = requireContext(directory, true, reg);
    let modules = modulesFiles.keys().reduce((modules, modulePath) => {
      const moduleName = modulePath.replace(regFile, '$1');
      const extName = modulePath.replace(regFile, '$2');
      const moduleNameArr = moduleName.split('/');
      modules[moduleName] = {
        path: moduleName,
        fileName: moduleNameArr[moduleNameArr.length - 1],
        ext: extName,
        fullName: `${moduleName}.${extName}`
      };
      return modules;
    }, {});

    //过滤忽略文件
    let temp = {};
    Object.keys(modules).map((key) => {
      let item = modules[key];
      if (!this.inArray(ignoreFileName, [item['fileName']])) {
        temp[key] = modules[key];
      }
    });
    return temp;

  }

  /***
   * @description 复制文件到新位置
   * @param currentFilePath
   * @param targetFliePath
   */
  copyFile(currentFilePath, targetFliePath) {
    return new Promise((resolve,reject)=>{
      if (!fs.existsSync(currentFilePath)) {
        reject(`复制文件路径不存在:${currentFilePath}`);
      }
      let readStream = fs.createReadStream(currentFilePath);
      readStream.once('error', (err) => {
        reject(err);
      });
      readStream.once('end', () => {
        resolve();
      });
      readStream.pipe(fs.createWriteStream(targetFliePath));
    })
  }

  /***
   * @description 删除文件
   * @param FilePath
   * @returns {Promise<unknown>}
   */
  removeFile(FilePath){
    return new Promise((resolve, reject)=>{
      fs.unlink(FilePath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('ok');
      });
    })
  }

  /**
   * @description 修改文件名字
   * @param FilePath
   * @param newPath
   * @returns {Promise<unknown>}
   */
  renameFile(FilePath,newPath){
    return new Promise((resolve, reject) => {
      fs.rename(FilePath, newPath ,(err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('ok');
      });
    })
  }

  /**
   * @description 判断文件是否存在
   * @param FilePath
   * @returns {Promise<unknown>}
   */
  existFile(FilePath){
    return new Promise((resolve, reject) => {
      fs.access(FilePath, fs.constants.F_OK, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('ok');
      });
    })
  }

  readFile(FilePath){
    return new Promise((resolve, reject) => {
      fs.readFile(FilePath,(err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(String(data));
      });
    });
  }

  writeFile(FilePath,data){
    return new Promise((resolve, reject) => {
      fs.writeFile(FilePath, data, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve('ok');
      });
    });
  }


}

module.exports = new FileHepler();



