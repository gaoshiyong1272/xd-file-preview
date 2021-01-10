'use strict';

const MD5 = require('md5.js');
import {iconData, typeHeader } from "./../contact";

class Helper {
  hideScroll(type){
    let body = document.getElementsByTagName('body')[0];
    if (type === 1) {
      body.style.overflowY = 'hidden';
      body.style.height = '100%';
    } else {
      body.style.overflowY = '';
      body.style.height = '';
    }
  };

  /**
   * @description 字符串截取
   * @param val
   * @param len
   */
  cutStringLen(val, len = 10) {
    let fix = '...';
    let newLength = 0;
    let newStr = "";
    let chineseRegex = /[^\x00-\xff]/g;
    let singleChar = "";
    let strLength = val.replace(chineseRegex, "**").length;
    for (let i = 0; i < strLength; i++) {
      singleChar = val.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }
    if (strLength > len) {
      newStr += fix;
    }
    return newStr;
  }

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
      '[object Object]': 'object',
      '[object Blob]' : 'blob'
    };
    return map[toString.call(obj)];
  }

  getID() {
    return this.random(1111111, 9999999);
  }

  md5Fn(str, hex = 'hex'){
    return new MD5()['update'](str)['digest'](hex);
  }

  random(min, max) {
    let Range = max - min;
    let Rand = Math.random();
    return (min + Math.round(Rand * Range));
  }

  parseURL(url) {
    if (!url) {
      url = window.location.href;
    }
    let a = document.createElement('a');
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function() {
        let ret = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length, i = 0, s;
        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }
          s = seg[i].split('=');
          if (s[1]) {
            ret[s[0]] = s[1];
          }
        }
        return ret;
      })(),
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    };
  }

  /***
   * @description 获取文件类型
   * @param blob
   */
  checkFileType(blob){
    let type = typeHeader['unkown'];
    if(typeHeader[blob.type]) {
      type = typeHeader[blob.type];
    }
    return type;
  }

  /**
   * @description 获取文件base64流
   * @param blob
   * @returns {Promise<unknown>}
   */
  fileReaderBase64(blob){
    return new Promise((resolve, reject)=>{
      let reader = new FileReader();
      reader.onload = (e)=> {
        //console.log(e.target['result']);
        resolve(e.target['result']);
      };
      reader.onerror = ()=>{
        reject('读取文件错误')
      }
      reader.readAsDataURL(blob);
    });
  }

  /**
   * @description 获取文件相关信息
   * @param url
   * @param name
   * @returns {Promise<unknown>}
   */
  getFileBase64(url='',name = '') {
    return new Promise((resolve, reject) => {
      let getName = ()=> {
        let arr = url.split('/');
        let reg = /^(.+)\.(.*)$/;
        //console.log('getName', arr[arr.length - 1], arr[arr.length - 1].match(reg));
        return arr[arr.length - 1];
      };

      let x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = "blob";
      x.onload = (e) => {
        console.log(e.target['response']);
        if (e.target['status'] === 200) {
          //console.log(url);
          let temp = {
            type: this.checkFileType(e.target['response']),
            size: e.target['response']['size'],
            name: name ? name: getName(),
          };

          this.fileReaderBase64(e.target['response'])
            .then(res=>{
              temp['url'] = res;
              temp['icon'] = this.getIcon(temp['type']);
              temp['response'] = e.target['response'];
              resolve(temp);
            })
            .catch(res=>{
              reject(res)
            })
        } else if (e.target['status'] === 404) {
          console.error('error', e);
          reject('您下载的文件不存在！');
        } else {
          console.error('error', e);
          reject('网络错误！');
        }
      };
      x.onerror = (e) => {
        console.log('onerror')
        console.log('error', e);
        reject('网络错误！');
      }
      x.send();
    })

  }

  /**
   * @description 获取图片相应的图片
   * @param type
   * @returns {string}
   */
  getIcon(type='') {
    let temp = '';
    if(iconData[type.toLocaleLowerCase()]) {
      temp = iconData[type.toLocaleLowerCase()];
    }
    return temp;
  }


  /**
   * @description 判断俩个需要处理的数字谁的小数点后位数多，
   * 以多的为准，值乘以10的小数位的幂数，相加以后，再除以10的小数位的幂数
   * @param currentNum
   * @param targetNum
   */
  checkFloatMore(currentNum, targetNum){
    let sq1, sq2;
    try {sq1 = currentNum.toString().split(".")[1].length;}
    catch (e) {sq1 = 0;}
    try {sq2 = targetNum.toString().split(".")[1].length;}
    catch (e) {sq2 = 0;}
    return Math.pow(10, Math.max(sq1, sq2));
  }

  /**
   * @description 两个小数相加
   * @param currentNum
   * @param targetNum
   * @return number
   */
  addFloatNumber(currentNum, targetNum){
    let power = this.checkFloatMore(currentNum, targetNum);
    return (currentNum * power + targetNum * power) / power;
  }

  /**
   * @description 两个小数减
   * @param currentNum
   * @param targetNum
   * @return number
   */
  cutFloatNumber(currentNum, targetNum) {
    let power = this.checkFloatMore(currentNum, targetNum);
    return (currentNum * power - targetNum * power) / power;
  }

  /**
   * @description 计算两个小数相乘
   * @param currentNum
   * @param targetNum
   * @returns {number}
   */
  multiplyFloatNumber(currentNum, targetNum){
    let m = 0, s1 = currentNum.toString(), s2 = targetNum.toString();
    try {m += s1.split(".")[1].length;} catch (e) {}
    try {m += s2.split(".")[1].length;} catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  }

  /**
   * @description 计算两个小数相除
   * @param currentNum
   * @param targetNum
   * @returns {number}
   */
  divisionFloatNumber(currentNum, targetNum){
    let t1 = 0, t2 = 0, r1, r2;
    try {t1 = currentNum.toString().split(".")[1].length} catch (e) {}
    try {t2 = targetNum.toString().split(".")[1].length} catch (e) {}
    r1 = Number(currentNum.toString().replace(".", ""))
    r2 = Number(targetNum.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }

  /**
   * @description 创建node节点
   * @param options {object}
   * @param options.fid 文件ID，唯一id（必填）
   * @param options.name 文件名称（选填）
   * @param options.url //文件地址（必填）
   * @param Vue Vue类 （必填）
   * @param view vue文件（必填）
   */
  createElement(options, Vue, view){
    console.log('PDF预览功能', options);
    let str = `${options.name}${options['fid']}`;
    let elId = `img-${this.md5Fn(str)}`;
    let ele = document.getElementById(elId);

    if (ele) {
      ele.style.display = "block";
      this.hideScroll(1);
      return ele;
    }

    const View = Vue.extend(view);
    let $view = new View({
      el: document.createElement('div')
    });
    options['ele'] = elId;
    $view.options = options;
    $view.close = (id) => {
      let ele = document.getElementById(id);
      ele.style.display = "none";
      this.hideScroll(-1);
    };

    document.body.appendChild($view.$el);
    this.hideScroll(1);
  }

}

export default new Helper();
