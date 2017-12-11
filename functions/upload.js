let Page = require('./page');
let data=require('../data/input_data/dataset.json');

let misumi = {

  uploadId: { get: function () { return browser.element('//*[@id="uploadfile"]');} },
  waitForFormComponent: { get: function () { return browser.element('//form[@name="uploadform"]');} },

  upload: {
    value: function(url) {
      this.waitForFormComponent.waitForVisible();
      browser.chooseFile('#uploadfile', url);
    }
  }
};

module.exports = Object.create(Page,misumi);