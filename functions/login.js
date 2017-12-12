let Page = require('./page');
let data=require('../data/input_data/dataset.json');

let misumi = {

  startRightAway: { get: function () { return browser.element('//*[@class="loginBtn"]//*[contains(text(),"すぐにはじめる")]');}},
  memberID: { get: function () { return browser.element('//*[@id="id"]');}},
  password: { get: function () { return browser.element('//*[@id="pass"]');}},
  loginbtn: { get: function () { return browser.element('//*[@class="btn btnColor01"]');}},
  error: { get: function () { return browser.element('//*[@id="error1"]/small');}},
  logoutUser:{ get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logout:{ get: function () { return browser.element('//*[@id="logoutButton"]');}},
  homepageHeader:{ get: function () { return browser.element('//*[@id="moldMv"]/div/div/div/h1');}},

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
      if (url == data.url.login) {
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
  },

  checkHomePage: {
    value: function(){
      let header = this.homepageHeader.getText();
       return header;
    }
    },
   checkRightAwayBtn: {
      value: function(){
        let visible=false;
        if (this.startRightAway.isVisible()){ 
          visible ="true";
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
      this.startRightAway.click();
      browser.pause(3000);
      expect(this.loginbtn.isVisible()).to.equal(true);
    }
   },

   memberLogin: {
    value: function(loginDetails) {
      this.memberID.waitForEnabled();
      this.memberID.setValue(loginDetails.UserId);
      this.password.setValue(loginDetails.Password);
      this.loginbtn.click();
      browser.pause(5000);
      var url = browser.getUrl();
      if (url == data.url.login) 
      {
        this.loginbtn.waitForEnabled();
        this.loginbtn.click();
      }
    }
   },
 };
module.exports = Object.create(Page,misumi);