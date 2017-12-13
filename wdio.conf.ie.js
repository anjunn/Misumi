/**
 *
 * wdio.conf.chrome.js
 * Test configuration file used for iOS test environment
 *
 */
 let merge = require('deepmerge');
 let wdioConfBase = require('./wdio.conf.base.js');

 exports.config = merge(wdioConfBase.config, {


  capabilities: [{
    browserName:   'internet explorer',
    version:'11.0',
  }],

  // capabilities: [{
  //   browserName:   'chrome',

  // }],

  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  before: function (capabilities, specs) {
    /**
     * Setup the Chai assertion framework
     */
     let chai = require('chai');
     global.expect = chai.expect;

     console.log('Starting Test Case: -', specs[0].replace(/^.*[\\\/]/, ''));

     let utils = require('./utilities/utils');
     utils.init();

     let size = {
      width: 1280,
      height: 600
    };
    browser.setViewportSize(size);
    browser.timeouts('page load', 60000);
    browser.params = this.params;
  }
});


