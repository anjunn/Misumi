let Page = require('./page');
let data=require('../Data/dataset.js');

let misumi = {

  startRightAway: {get: function () { return browser.element('//*[@class="loginBtn"]//*[contains(text(),"すぐにはじめる")]');}},
  memberID: {get: function () { return browser.element('//*[@id="id"]');}},
  password: {get: function () { return browser.element('//*[@id="pass"]');}},
  loginbtn: {get: function () { return browser.element('//*[@class="btn btnColor01"]');}},
  error: {get: function () { return browser.element('//*[@id="error2"]/small');}},

  loginToMeviy: {
    value: function(loginDetails) {
      // this.startRightAway.waitForEnabled();
      // this.startRightAway.click();
      this.memberID.waitForEnabled();
      this.memberID.setValue(loginDetails.UserId);
      this.password.setValue(loginDetails.Password);
      this.loginbtn.click();
      browser.pause(3000);
         var url = browser.getUrl();
         if(url=="https://prs-origin-tst.meviy.misumi-ec.com/login")
         {
          this.loginbtn.waitForEnabled();
          this.loginbtn.click();
        } 
    }
  },
  checkUrl: {
    value: function() {
      browser.waitForEnabled('#uploadfile');
      var url = browser.getUrl();
      expect(url).to.equal(data.url.myPageUrl);
      } 
    }

};

module.exports = Object.create(Page,misumi);