let Page = require('./page');
let data=require('../Data/dataset.js');

let misumi = {

  upload: {
    value: function(url) {
      browser.waitForEnabled('#uploadfile');
      browser.chooseFile('#uploadfile',url);
    }
  }
};

module.exports = Object.create(Page,misumi);