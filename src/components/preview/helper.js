const MD5 = require('md5.js');

class Helper {
  constructor(){
    this.isArray = [
      'JPEG','JPG','PNG','GIF',
      'PDF',
      'XLS', 'PPT', 'DOC', 'DOCX', 'XLSX', 'PPTX'
    ];
  }

  hideScroll(type){
    let body = document.getElementsByTagName('body')[0];
    if (type === 1) {
      body.style.overflowY = 'hidden';
      body.style.height = '100%';
    } else {
      body.style.overflowY = 'auto';
      body.style.height = 'auto';
    }
  };

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

  checkCrossDomain(url) {
    let host = this.parseURL();
    let urlHost = this.parseURL(url);

    if (urlHost.host === host.host) {
      return false;
    }
    console.error('访问地址跨域访问,请联系技术人员及时处理！');
    return true;
  }

  checkIsPreview(obj){
    if(JSON.stringify(this.isArray).indexOf(obj.type.toLocaleUpperCase()) > -1){
      return true;
    }
    else {
      return false;
    }
  }


}

export default new Helper();
