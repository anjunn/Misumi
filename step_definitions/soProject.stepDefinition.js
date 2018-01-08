let soProjectPage = require('../functions/soProject.js');
let singlePinExpectedData = require('../data/expected-results/single-pin.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let plateExpectedData = require('../data/expected-results/plate.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');

module.exports = function () {

  this.Given(/^Admin selects the supplier from so page$/, () => {
    soProjectPage.selectSupplier();
  });

    this.Given(/^Admin sends email to the supplier$/, {retry: 2}, () => {
    soProjectPage.sendMailToSupplier();
  });
    
  this.Given(/^Admin verifies if the send email pop up is shown and clicks ok in SO page$/, () => {
    soProjectPage.verifySendMail();
  });

  this.Then(/^Operator verifies the operation status for (single pin|multiple pin|plate|pin and plate)$/, (pinType) => {
    if(pinType === 'single pin') {
      soProjectPage.checkSoOperationStatus(singlePinExpectedData.numberOfParts);
    } else if(pinType === 'multiple pin') {
      soProjectPage.checkSoOperationStatus(multiplePinExpectedData.numberOfParts);
    } else if(pinType === 'pin and plate') {
      soProjectPage.checkSoOperationStatus(pinAndPlateExpectedData.numberOfParts);
    } else if(pinType === 'plate'){
      soProjectPage.checkSoOperationStatus(plateExpectedData.numberOfParts);
    }
  });

  this.Then(/^Operator checks product details in from SO for (single pin|multiple pin|plate|pin and plate)$/, (pinType) => {
    if(pinType === 'single pin') {
      soProjectPage.checkSoProductPartNumber(singlePinExpectedData.numberOfParts);
    } else if(pinType === 'multiple pin') {
      soProjectPage.checkSoProductPartNumber(multiplePinExpectedData.qtPartNumber, multiplePinExpectedData.numberOfParts);
    } else if(pinType === 'pin and plate') {
      soProjectPage.checkSoProductPartNumber(pinAndPlateExpectedData.numberOfParts);
    } else if(pinType === 'plate'){
      soProjectPage.checkSoProductPartNumber(plateExpectedData.numberOfParts);
    }
  });

  this.Then(/^Operator checks 3d view of project from SO page$/, () => {
    soProjectPage.checkProjectPage();
  });

  this.Then(/^Operator verifies that order button is disabled when viewing from SO page$/, () => {
    soProjectPage.checkOrderButton();
  });

  this.Then(/^Operator checks 3d view of each part from SO page for (single pin|multiple pin|plate|pin and plate)$/, (pinType) => {
    if(pinType === 'single pin') {
      soProjectPage.checkPartsView(singlePinExpectedData.numberOfParts, singlePinExpectedData.partNames);
    } else if(pinType === 'multiple pin') {
      soProjectPage.checkPartsView(multiplePinExpectedData.numberOfParts, multiplePinExpectedData.partNames);
    } else if(pinType === 'pin and plate') {
      soProjectPage.checkPartsView(pinAndPlateExpectedData.numberOfParts, pinAndPlateExpectedData.partNames);
    } else if(pinType === 'plate'){
      soProjectPage.checkPartsView(plateExpectedData.numberOfParts, plateExpectedData.partNames);
    }
  });
};