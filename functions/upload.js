let Page = require('./page');
let data=require('../data/dataset.json');

let misumi = {

  uploadId: { get: function () { return browser.element('//*[@id="uploadfile"]');} },

  upload: {
    value: function(url) {
      this.uploadId.waitForEnabled();
      browser.chooseFile('#uploadfile', url);
    }
  }
};

module.exports = Object.create(Page,misumi);