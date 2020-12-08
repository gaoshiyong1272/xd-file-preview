'use strict';

const fileHepler = require('./../fileHepler');
const basePath = require('./../path');
const clog = require('./../clog');
// const path = require('path');
let cssContentArray = [];

clog('\n\n\n');
clog('---开始拷贝--------------', 'red');


/**
 * 替换文件index
 * @param content
 * @param item
 * @returns {*}
 */
function replaceHash(content, item){
  let cssReg = /((\..*?)\.css)$/;
  let contentarr = item.match(cssReg);
  let version = `.css?version=${Math.floor(new Date().getTime() / 1000)}`;
  let replce = {
    oldPath: item,
    newPath : item.replace(new RegExp(contentarr[2]),''),
  };
  cssContentArray.push(replce);
  return content.replace(new RegExp(contentarr[1]), version);
}

function init(){
  fileHepler.readFile(basePath.indexHtmlFilePath)
    .then((res) => {
      let cssReg = /\/static\/.*?(\..*?)\.css/ig;
      let contentarr = res.match(cssReg);
      if (!contentarr) {
        clog('文件无更新', 'black');
        return;
      }
      for (let i = 0; i < contentarr.length; i++) {
        res = replaceHash(res, contentarr[i]);
      }

      fileHepler.writeFile(basePath.indexHtmlFilePath, res)
        .then(() => {
          clog('更新首页样式路径成功!', 'green');
        })
        .catch();

      for (let k = 0; k < cssContentArray.length; k++) {
        let olpPath = basePath.cssOutputRoot + cssContentArray[k]['oldPath'];
        let newPath = basePath.cssOutputRoot + cssContentArray[k]['newPath'];
        fileHepler.renameFile(olpPath, newPath)
          .then(() => {
            clog(cssContentArray[k], 'green');
          })
          .catch()
      }
    });
}

setTimeout(() => {
  init()
}, 2000);






