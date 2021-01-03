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

  checkFileType(blob){

  }

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

  getFileBase64(url='',name = '') {
    return new Promise((resolve, reject) => {
      let getName = ()=> {
        let arr = url.split('/');
        let reg = /^(.+)\.(.*)$/;
        console.log('getName', arr[arr.length - 1], arr[arr.length - 1].match(reg));
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
          }
          //console.log(temp);
          this.fileReaderBase64(e.target['response'])
            .then(res=>{
              resolve(res);
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
}

export default new Helper();
