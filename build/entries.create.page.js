'use strict';

const path = require('path');

module.exports = {
  init(conf) {
    return this.pages(conf);
  },

  commonParamter() {
    let time = new Date();
    let version = String(time.getTime() / 1000);
    return {
      version: version,
    };

  },
  pages(conf) {
    console.log('\n');
    let entries = conf.getDirJsFile(conf.entryDirectory);
    let pages = {};
    Object.keys(entries).forEach((entry) => {
      console.log(`cretae entry, path:${entry} file:${entry}.html`);
      pages[entry] = {};
      pages[entry]['entry'] = path.resolve(conf['entryDirectory'], `${entry}.js`);
      pages[entry]['template'] = path.resolve(conf['packingTemplatesPath'], 'index.html');
      pages[entry]['filename'] = `${entry}.html`;
      pages[entry]['title'] = entry;
      pages[entry]['paramters'] = this.commonParamter();
      pages[entry]['chunks'] = ['chunk-vendors', 'chunk-common', entry];
    });

    return pages;
  }
};
