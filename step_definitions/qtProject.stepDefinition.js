let qtProjectPage = require('../functions/qtProject.js');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');
let plateExpectedData = require('../data/expected-results/plate.json');
let plateInputData = require('../data/input-data/plate.json');

module.exports = function () {

  this.Given(/^Admin verifies product price and part names for (plate|pin and plate)$/, (pinType) => {
    if(pinType === 'pin and plate') {
      qtProjectPage.validateOrderDetails(pinAndPlateExpectedData.partNames, pinType);
    } else {
      qtProjectPage.validateOrderDetails(plateExpectedData.partNames, pinType);
    }
  });

  this.When(/^Admin sends mail to Tpro to get 2D data for (plate|pin and plate)$/, (pinType) => {
    qtProjectPage.sendMailFor2DData(pinType);
  });

  this.Then(/^Admin verifies if the send email pop up is shown and clicks ok$/, () => {
    qtProjectPage.verifySendMail();
  });

  this.When(/^Admin requests for quotation to supplier$/, () => {
    qtProjectPage.sendMailToSupplier();
  });

  this.Then(/^Admin modifies the quotation after getting data from suppliers for (plate|pin and plate)$/, (pinType) => {
    qtProjectPage.editQuotation(pinAndPlateInputData.quotationResult, pinType);
  });

  this.Then(/^Admin sends mail to customer for (plate|pin and plate)$/, (type) => {
    qtProjectPage.sendMailToCustomer(type);
  });

  this.Then(/^Admin sends mail for ordering (plate|pin and plate)$/, (type) => {
    qtProjectPage.verifySendMailForOrdering(type);
  });

};



