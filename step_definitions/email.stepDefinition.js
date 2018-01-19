let emailPage = require('../functions/email.js');

module.exports = function () {

  this.Given(/^User decides to check the email$/, () => {
    emailPage.goToEmail();
  });

  this.When(/^User logs in to mail account$/, () => {
    emailPage.loginToEmail();
  });

  this.Then(/^User selects the product (estimate|quotation|order) mail$/, {retry: 2}, (mailType) => {
    emailPage.selectMail(mailType);
  });

  this.Then(/^User verifies the product details in (estimate|quotation|order) mail$/, {retry: 2}, (mailType) => {
    if ( mailType === 'estimate' ) {
      emailPage.validateEstimationMail();
    } else if ( mailType === 'quotation' ) {
      emailPage.validateQuotationMail();
    } else if ( mailType === 'order' ) {
      emailPage.validateOrderMail();
    }
  });

  this.Then(/^User goes back to project page$/, () => {
    emailPage.goToProductPage();
  });

  this.Then(/^User checks the contents of the mail$/, () => {
    emailPage.checkMailContent();
  });
};