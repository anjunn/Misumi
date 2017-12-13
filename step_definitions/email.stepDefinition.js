let emailPage = require('../functions/mail.js');
let singlePinExpectedData = require('../data/expected_results/single_pin_expected.json');

module.exports = function () {

  this.Given(/^User opens email$/, () => {
    browser.url('https://login.microsoftonline.com/');
  });

  this.When(/^User logins to mail account$/, () => {
    emailPage.login();
  });

  this.Then(/^User verify project details in the mail$/, () => {
    emailPage.selectMail();
    emailPage.validateMail(browser.params.singlePin.initialPrice, singlePinExpectedData.projectName);
  });

  this.Then(/^User goes back to project page$/, () => {
    browser.url(browser.params.projectPageUrl);
  });
};