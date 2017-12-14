let Page = require('./page');
let data = require('../data/input-data/dataset.json');

let loginPage = {

  startRightAway: { get: function () { return browser.element('//li[@class="loginBtn"]');}},
  userNameField: { get: function () { return browser.element('//input[@id="id"]');}},
  passwordField: { get: function () { return browser.element('//input[@id="pass"]');}},
  loginButton: { get: function () { return browser.element('//div[@id="login_btn_on"]');}},
  errorMessage: { get: function () { return browser.element('//div[@id="error1"]/small');}},
  memberMenuButton:{ get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logoutButton:{ get: function () { return browser.element('//*[@id="logoutButton"]');}},
  homepageHeader:{ get: function () { return browser.element('//section[@id="moldMv"]//[@class="inner"]/h1');}},

  /*
   * Goes to Home Page
   */
  goToHomePage: {
    value: function () {
      browser.url('https://prs-origin-tst.meviy.misumi-ec.com/');
    }
  },

  /*
   * Logs out from the website
   */
  logout: {
    value: function() {
      this.memberMenuButtonButton.waitForEnabled();
      this.memberMenuButton.click();
      this.logoutButton.waitForEnabled();
      this.logoutButton.click();
    }
  },

  /*
   * Validates the webpage header
   */

  validateWebpageHeader: {
    value: function(){
      let header = this.homepageHeader.getText();
      expect(expectedData.homePageTitle).to.equal(header);
    }
  },

  /*
   * Validates the start right away button
   */
  validateRightAwayButton: {
    value: function(){
      expect(this.startRightAway.isVisible()).to.equal(true);
    }
  },

  /*
   * Validates the username field in login page
   */
  validateUserNameField: {
    value: function(){
      expect(this.userNameField.isVisible()).to.equal(true);
    }
  },

  /*
   * Validates the password field in login page
   */
  validatePasswordField: {
    value: function(){
      expect(this.passwordField.isVisible()).to.equal(true);
    }
  },

  /*
   * Goes to login page
   */
  goToLoginPage: {
    value: function(){
      this.startRightAway.click();
    }
  },

  /*
   * Validates the login page url
   */
  validateLoginPageUrl: {
    value: function () {
      this.loginButton.waitForVisible();
      expect(browser.getUrl()).to.equal(data.url.login);
    }
  },

  /*
   * Logs into the website
   */
  login: {
    value: function() {
      var loginDetails = data.loginCredentials[0];
      this.userNameField.waitForEnabled();
      this.userNameField.setValue(loginDetails.UserId);
      this.passwordField.setValue(loginDetails.Password);
      this.loginButton.click();
      browser.pause(5000);
      if (this.errorMessage.isVisible()) {
        this.loginButton.waitForEnabled();
        this.loginButton.click();
      }
    }
  },
 };

module.exports = Object.create(Page, loginPage);