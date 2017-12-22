
let Page = require('./page');
let data = require('../data/input-data/dataset.json');
let expectedData = require('../data/expected-results/common.json');
/**
 * Login Page Object
 *
 * @class functions/management/LoginPage
 * @type {Page}
 */
let managementLoginPage = {
  /**
   * define elements
   */
  loginPageTitle: { get: function () { return browser.element('//h2[@class="form-signin-heading"]');}},
  usernameField: { get: function () { return browser.element('//input[@id="username"]');}},
  passwordField: { get: function () { return browser.element('//input[@id="password"]');}},
  loginButton: { get: function () { return browser.element('//button[@class="btn btn-lg btn-primary btn-block"]');}},
  /**
   * User goes to management login page
   */
  goToLoginPage: {
    value: function() {
      browser.url(data.url.managementUrl);
    }
  },

  /**
   * User verifies management login page
   */
  validateLoginPage: {
    value: function() {
      this.loginPageTitle.waitForEnabled();
      expect(this.loginPageTitle.getText()).to.be.equal(expectedData.managementLoginPageText);
      this.usernameField.isVisible();
      this.passwordField.isVisible();
    }
  },

  /**
   * User logins to management site
   */
  login: {
    value: function(managementLoginDetails) {
      this.usernameField.setValue(data.loginCredentials.management.username);
      this.passwordField.setValue(data.loginCredentials.management.password);
      this.loginButton.click();
    }
  },
};

module.exports = Object.create(Page, managementLoginPage);