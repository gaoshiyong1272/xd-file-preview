'use strict';

const proxy = {
  '/api/admin': {
    target: 'https://sandbox-c.jufubao.cn',
    pathRewrite: {"^/api/admin": "/api/admin"},
    changeOrigin: true,
    secure: false,
  },
  '/oauth': {
    target: 'https://sandbox-c.jufubao.cn',
    pathRewrite: {"^/oauth": "/oauth"},
    changeOrigin: true,
    secure: false,
  }
};

const defaultSettings = require('./settings.js');

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || defaultSettings.port || 9527; // dev port

const devServer = {
  port: defaultSettings.port,
  open: true,
  //host:'192.168.0.4',
  overlay: {
    warnings: true,
    errors: true
  },
  //proxy, //proxy与before不能共用，before优先于proxy
  //before: ()=> {}
};

module.exports = devServer;
