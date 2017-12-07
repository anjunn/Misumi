let Page = require('./page');
let data=require('../Data/dataset.js');

let misumi = {

  startRightAway: {get: function () { return browser.element('//*[@class="loginBtn"]//*[contains(text(),"すぐにはじめる")]');}},
  memberID: {get: function () { return browser.element('//*[@id="id"]');}},
  password: {get: function () { return browser.element('//*[@id="pass"]');}},
  loginbtn: {get: function () { return browser.element('//*[@class="btn btnColor01"]');}},
  error: {get: function () { return browser.element('//*[@id="error2"]/small');}},
  logoutUser:{get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logout:{get: function () { return browser.element('//*[@id="logoutButton"]');}},
  
  loginToMeviy: {
    value: function(loginDetails) {
      this.startRightAway.waitForEnabled();
      this.startRightAway.click();
      this.memberID.waitForEnabled();
      this.memberID.setValue(loginDetails.UserId);
      this.password.setValue(loginDetails.Password);
      this.loginbtn.click();
      browser.pause(5000);
         var url = browser.getUrl();
         if(url==data.url.login)
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
    },
  logoutFunction:{
    value: function() {
     this.logoutUser.waitForEnabled();
     this.logoutUser.click();
     this.logout.waitForEnabled();
     this.logout.click();  
    }
    }
 };   
module.exports = Object.create(Page,misumi);