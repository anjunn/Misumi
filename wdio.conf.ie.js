/**
 *
 * wdio.conf.ie.js
 * Test configuration file used for IE 11 test environment
 *
 */
let merge = require('deepmerge');
let wdioConfBase = require('./wdio.conf.base.js');

exports.config = merge(wdioConfBase.config, {

  capabilities: [{
    browserName:   'internet explorer',
    version:'11.0',
  }],

});


