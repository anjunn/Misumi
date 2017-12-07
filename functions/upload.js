let Page = require('./page');
let data=require('../Data/dataset.js');

let misumi = {

  uploadId: { get: function () { return browser.element('//*[@id="uploadfile"]');} },

  upload: {
    value: function(url) {
      this.uploadId.waitForEnabled();
      browser.chooseFile('#uploadfile',url);
    }
  }
};

module.exports = Object.create(Page,misumi);