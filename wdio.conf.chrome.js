/**
 *
 * wdio.conf.chrome.js
 * Test configuration file used for chrome environment
 *
 */
let merge = require('deepmerge');
let path = require('path');
let wdioConfBase = require('./wdio.conf.base.js');

const pathToDownload = path.resolve('data/downloads');

exports.config = merge(wdioConfBase.config, {

  capabilities: [{
    browserName:   'chrome',
    chromeOptions: {
      prefs: {
        "download.default_directory": pathToDownload
      }
    }
  }],

});


