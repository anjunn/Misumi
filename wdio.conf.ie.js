/**
 *
 * wdio.conf.ie.js
 * Test configuration file used for IE 11 test environment
 *
 */
let merge = require('deepmerge');
let path = require('path');
let wdioConfBase = require('./wdio.conf.base.js');

const pathToDownload = path.resolve('data/downloads');

exports.config = merge(wdioConfBase.config, {

  capabilities: [{
    browserName: 'internet explorer',
    version:'11.0',
    ignoreProtectedModeSettings: true,
    unexpectedAlertBehaviour: "accept",
    enablePersistentHover: true,
    ieOptions: {
      prefs: {
        "download.default_directory": pathToDownload
      }
    }
  }],

});


