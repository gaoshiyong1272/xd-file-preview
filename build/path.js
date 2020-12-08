'use strict';
const resolve = dir => require('path').join(__dirname, dir);



module.exports = {
  buildTemplateDirectory: resolve( './template'),
  buildComponentsDirectory: resolve('../src/components'),
};
