'use strict';
const autoload = require('./../autoload');
const basePath = require('./../path');
let time = null;

class CreatedComponentsPlugin {
  constructor() {}
  apply(compiler) {
    if (time) {
      clearTimeout(time);
      time = null;
    }
    time = setTimeout(() => {
      autoload.createAutoload(basePath.buildComponentsDirectory, ['vue'], 'array', 'Components');
    }, 30);
  }
}

module.exports = CreatedComponentsPlugin;
