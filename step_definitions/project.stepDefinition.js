let projectPage = require('../functions/project');
let singlePinExpectedData = require('../data/expected-results/single-pin.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');

module.exports = function () {

 this.Given(/^User opens the uploaded project$/, () => {
    projectPage.openProject();
  });

  this.When(/^User does Feature Recognition for (single|multiple) pin$/, (pinType) => {
    projectPage.compareImage(`${pinType}_pin.png`, `${pinType}_pin_expected/${pinType}_pin_expected.png`);
  });

  this.Then(/^User verifies part names for (single|multiple) pin$/, (pinType) => {
  	if(pinType === 'single') {
      projectPage.checkSinglePinName(singlePinExpectedData.partNames);
    } else {
      projectPage.checkMultiplePinName(multiplePinExpectedData.partNames);
    }
  });

  this.Then(/^User defines quotation condition in parts view for (single|multiple) pin$/, (pinType) => {
  	if(pinType === 'single') {
      projectPage.quotionConditionInPartsView(singlePinExpectedData.quotationConditionInPartsView.quantity);
  	} else {
      projectPage.quotionConditionInPartsView(multiplePinExpectedData.quotationConditionInPartsView.quantity);
  	}
  });

  this.When(/^User checks grouping$/, () => {
    projectPage.checkGrouping(multiplePinExpectedData.grouping);
  });

};