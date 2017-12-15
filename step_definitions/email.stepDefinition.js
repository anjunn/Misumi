let emailPage = require('../functions/email.js');

module.exports = function () {

  this.Given(/^User decides to check the email$/, () => {
   emailPage.goToEmail();
  });

  this.When(/^User logs in to mail account$/, () => {
    emailPage.loginToEmail();
  });

  this.Then(/^User verifies the project details in the mail$/, () => {
    emailPage.selectMail();
    emailPage.validateMail();
  });

  this.Then(/^User goes back to project page$/, () => {
    emailPage.goToProductPage();
  });
};