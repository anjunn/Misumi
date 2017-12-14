let emailPage = require('../functions/mail.js');

module.exports = function () {

  this.Given(/^User opens email$/, () => {
    browser.url('https://login.microsoftonline.com/');
  });

  this.When(/^User logins to mail account$/, () => {
    emailPage.login();
  });

  this.Then(/^User verify project details in the mail$/, () => {
    emailPage.selectMail();
    emailPage.validateMail();
  });

  this.Then(/^User goes back to project page$/, () => {
    emailPage.goToProductPage();
  });
};