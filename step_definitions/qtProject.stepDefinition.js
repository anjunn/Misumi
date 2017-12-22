let qtProjectPage = require('../functions/qtProject.js');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');

module.exports = function () {

  this.Given(/^Admin verifies product price and part names$/, () => {
    qtProjectPage.validateOrderDetails(pinAndPlateExpectedData.partNames);
  });

  this.When(/^Admin sends mail to Tpro to get 2D data$/, () => {
    qtProjectPage.sendMailFor2DData();
  });

  this.Then(/^Admin verifies if the send email pop up is shown and clicks ok$/, () => {
    qtProjectPage.verifySendMail();
  });

  this.When(/^Admin requests for quotation to supplier$/, () => {
    qtProjectPage.sendMailToSupplier();
  });

  this.Then(/^Admin modifies the quotation after getting data from suppliers$/, () => {
    qtProjectPage.editQuotation(pinAndPlateInputData.quotationResult);
  });

  this.Then(/^Admin sends mail to customer$/, () => {
    qtProjectPage.sendMailToCustomer();
  });

};



