let uploadPage = require('../functions/upload');
let data = require('../data/input-data/dataset.json');
let singlePinInputData = require('../data/input-data/single-pin.json');
let multiplePinInputData = require('../data/input-data/multiple-pin.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');
let plateInputData = require('../data/input-data/plate.json');
let singlePinExpectedData = require('../data/expected-results/single-pin.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let plateExpectedData = require('../data/expected-results/plate.json');

module.exports = function () {

  this.Given(/^User uploads 3D data for ((single|multiple) pin|plate|pin and plate) from dialog$/, (pinType) => {
  	if (pinType === 'single pin') {
  	  path = data.uploadPath.singlePin;
  	} else if (pinType === 'multiple pin'){
      path = data.uploadPath.multiplePin;
  	} else if (pinType === 'plate') {
 	    path = data.uploadPath.plate;
  	} else if (pinType === 'pin and plate') {
  	  path = data.uploadPath.pinPlate;
  	}
  	uploadPage.uploadFromDialog(path);
  });

  this.Given(/^User uploads 3D data for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
    if (pinType === 'single pin') {
      path = data.uploadPath.singlePin;
    } else if (pinType === 'multiple pin'){
      path = data.uploadPath.multiplePin;
    } else if (pinType === 'plate') {
      path = data.uploadPath.plate;
    } else if (pinType === 'pin and plate') {
      path = data.uploadPath.pinPlate;
    }
    uploadPage.upload(path);
  });

  this.When(/^User verifies whether upload is successful for ((single|multiple) pin|plate|pin and plate)$/, {retry: 2},(pinType) => {
    uploadPage.verifyUpload();
  });

  this.When(/^User defines quotation condition for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if (pinType === 'single pin') {
      uploadPage.quotationConditionFill(singlePinInputData.quotationCondition);
    } else if (pinType === 'multiple pin') {
      uploadPage.quotationConditionFill(multiplePinInputData.quotationCondition);
    } else if (pinType === 'plate') {
		  uploadPage.quotationConditionFillPlate(plateInputData.quotationCondition);
    } else if (pinType === 'pin and plate') {
      uploadPage.quotationConditionFill(pinAndPlateInputData.quotationCondition);
    }
  });

  this.Then(/^User checks whether thumb nail of 3D appears for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if (pinType === 'single pin') {
      uploadPage.checkThumbNail('single-pin/single-pin-thumbnail.png');
  	} else if (pinType === 'multiple pin') {
  	  uploadPage.checkThumbNail('multiple-pin/multiple-pin-thumbnail.png');
  	} else if (pinType === 'plate') {
  		uploadPage.checkThumbNail('plate/plate-thumbnail.png');
  	} else if (pinType === 'pin and plate') {
  		uploadPage.checkThumbNail('pin-and-plate/pin-and-plate-thumbnail.png');
  	}
  });

  this.Then(/^User verifies project details for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
    uploadPage.checkNameAndPrice(pinType);
  });

  this.When(/^User goes to my page$/, () => {
    uploadPage.goToMyPage();
  });

  this.Given(/^User validates manual quotation icon and price in the listing screen$/, () => {
    uploadPage.checkManualQuotationIconInList();
    uploadPage.validatePriceInList();
  });

    this.Given(/^Check different combination of quotations$/, () => {
    uploadPage.checkCombinationMaterialToSurfacetreatment();
  });
};