let qtProjectPage = require('../functions/qtProject.js');
let singlePinExpectedData = require('../data/expected-results/single-pin.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');
let plateExpectedData = require('../data/expected-results/plate.json');
let plateInputData = require('../data/input-data/plate.json');

module.exports = function () {

  this.Given(/^Admin verifies product price and part names for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
    if(pinType === 'single pin') {
      qtProjectPage.validateOrderDetails(singlePinExpectedData.partNames, pinType);
    } else if(pinType === 'multiple pin') {
      qtProjectPage.validateOrderDetails(multiplePinExpectedData.partNames, pinType);
    } else if(pinType === 'pin and plate') {
      qtProjectPage.validateOrderDetails(pinAndPlateExpectedData.partNames, pinType);
    } else {
      qtProjectPage.validateOrderDetails(plateExpectedData.partNames, pinType);
    }
  });

  this.When(/^Admin sends mail to Tpro to get 2D data for (single pin|multiple pin|plate|pin and plate)$/, (pinType) => {
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

  this.Then(/^Admin verifies the operation status for the item$/, () => {
    qtProjectPage.checkQtOperationStatus();
  });

  this.Then(/^Operator checks product part number for (single pin|multiple pin|plate|pin and plate)$/, (pinType) => {
    if(pinType === 'single pin') {
      qtProjectPage.checkProductPartNumber(singlePinExpectedData.numberOfParts);
    } else if(pinType === 'multiple pin') {
      qtProjectPage.checkProductPartNumber(multiplePinExpectedData.numberOfParts);
    } else if(pinType === 'pin and plate') {
      qtProjectPage.checkProductPartNumber(pinAndPlateExpectedData.numberOfParts);
    } else if(pinType === 'plate'){
      qtProjectPage.checkProductPartNumber(plateExpectedData.numberOfParts);
    }
  });

  this.Then(/^Operator checks QT revision$/, () => {
    qtProjectPage.checkQtRevision();
  });

};



