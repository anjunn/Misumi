let emailPage = require('../functions/email.js');

module.exports = function () {

  this.Given(/^User decides to check the email$/, () => {
    emailPage.goToEmail();
  });

  this.When(/^User logs in to mail account$/, () => {
    emailPage.loginToEmail();
  });

  this.Then(/^User navigates to inbox$/, () => {
    emailPage.selectMail();
  });

  this.Then(/^User verifies the project details in the (estimate|quotation|order) mail$/, (mailType) => {
    emailPage.selectMail(mailType);
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
};