let Page = require('./page');
let data = require('../data/input_data/dataset.json');

let loginPage = {

  startRightAway: { get: function () { return browser.element('//*[@class="loginBtn"]//*[contains(text(),"すぐにはじめる")]');}},
  memberID: { get: function () { return browser.element('//*[@id="id"]');}},
  password: { get: function () { return browser.element('//*[@id="pass"]');}},
  loginbtn: { get: function () { return browser.element('//*[@class="btn btnColor01"]');}},
  error: { get: function () { return browser.element('//*[@id="error1"]/small');}},
  logoutUser:{ get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logout:{ get: function () { return browser.element('//*[@id="logoutButton"]');}},
  homepageHeader:{ get: function () { return browser.element('//*[@id="moldMv"]/div/div/div/h1');}},

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
  },
  checkHomePage: {
    value: function(){
      let header = this.homepageHeader.getText();
      return header;
    }
  },
  checkRightAwayBtn: {
    value: function(){
      let visible = false;
      if (this.startRightAway.isVisible()) {
        visible = "true";
      }
      return visible;
    }
  },
  validateMemberID: {
    value: function(){
      expect(this.memberID.isVisible()).to.equal(true);
    }
  },
  validatePassword: {
    value: function(){
      expect(this.password.isVisible()).to.equal(true);
    }
  },
  validateLoginBtn: {
    value: function(){
      expect(this.loginbtn.isVisible()).to.equal(true);
    }
  },
  /*
  *
  */
  memberLogin: {
    value: function() {
      this.memberID.waitForEnabled();
      this.memberID.setValue(data.loginCredentials.presentation.username);
      this.password.setValue(data.loginCredentials.presentation.password);
      this.loginbtn.click();
      browser.pause(5000);
      var url = browser.getUrl();
      if (url == data.url.login) {
        this.loginbtn.waitForEnabled();
        this.loginbtn.click();
      }
    }
  },

  /*
  *
  Function to click 'Start Right Away' button when user is alredy logged in
  */

  clickStartRightAwayButton:{
    value:function(){
      this.startRightAway.waitForEnabled();
      this.startRightAway.click();
    }
  }
 };

module.exports = Object.create(Page,loginPage);