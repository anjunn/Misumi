/**
 *
 * wdio.conf.chrome.js
 * Test configuration file used for chrome environment
 *
 */
let merge = require('deepmerge');
let wdioConfBase = require('./wdio.conf.base.js');

exports.config = merge(wdioConfBase.config, {

  capabilities: [{
    browserName:   'chrome',
    chromeOptions: {
    }
  }],

});


