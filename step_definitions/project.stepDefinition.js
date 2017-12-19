let projectPage = require('../functions/project');
let singlePinExpectedData = require('../data/expected-results/single-pin.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');
let plateExpectedData = require('../data/expected-results/plate.json');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let singlePinInputData = require('../data/input-data/single-pin.json');
let multiplePinInputData = require('../data/input-data/multiple-pin.json');
let plateInputData = require('../data/input-data/plate.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');

module.exports = function () {

  this.Given(/^User opens the uploaded project$/, () => {
    projectPage.openProject();
  });

  this.When(/^User does Feature Recognition for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
    if (pinType === 'single pin') {
      projectPage.compareImage('single-pin.png', 'single-pin/single-pin.png');
    } else if (pinType === 'multiple pin') {
      projectPage.compareImage('multiple-pin.png', 'multiple-pin/multiple-pin.png');
    } else if (pinType === 'plate') {
      projectPage.compareImage('plate.png', 'plate/plate.png');
    } else if (pinType === 'pin and plate') {
      projectPage.compareImage('pin-and-plate.png', 'pin-and-plate/pin-and-plate.png');
    }
  });

  this.Then(/^User verifies part names for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if (pinType === 'single pin') {
      projectPage.validatePartNames(singlePinExpectedData.partNames, 1);
    } else if (pinType === 'multiple pin') {
      projectPage.validatePartNames(multiplePinExpectedData.partNames, 7);
    } else if (pinType === 'plate') {
      projectPage.validatePartNames(plateExpectedData.partNames, 1);
    } else if (pinType === 'pin and plate') {
      projectPage.validatePartNames(pinAndPlateExpectedData.partNames, 3);
    }
  });

  this.Then(/^User defines quotation condition in parts view for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if(pinType === 'single') {
      projectPage.quotionConditionInPartsView(singlePinInputData.quotationConditionInPartsView.quantity);
  	} else if (pinType === 'multiple pin') {
      projectPage.quotionConditionInPartsView(multiplePinInputData.quotationConditionInPartsView.quantity);
  	} else if (pinType === 'plate') {
      projectPage.quotionConditionInPartsView(plateInputData.quotationConditionInPartsView.quantity);
    } else if (pinType === 'pin and plate') {
      projectPage.quotionConditionInPartsView(pinAndPlateInputData.quotationConditionInPartsView.quantity);
    }
  });

  this.When(/^User checks grouping$/, () => {
    projectPage.checkGrouping(multiplePinExpectedData.grouping);
  });

  this.Then(/^User request for manual quotation in parts view for (plate|pin and plate)$/, () => {
    if (pinType === 'pin and plate') {
      projectPage.estimateConditionPartsview(pinAndPlateInputData.estimateCondition);
    } else if (pinType === 'plate') {
      projectPage.estimateConditionPartsview(plateInputData.estimateCondition);
    }
  });

};