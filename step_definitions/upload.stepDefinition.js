let uploadPage = require('../functions/upload');
let data = require('../data/input-data/dataset.json');
let singlePinExpectedData = require('../data/expected-results/single-pin.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');

module.exports = function () {

  this.Given(/^User uploads 3D data for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if(pinType === 'single pin') {
  	  path = data.uploadPath.singlePin;
  	} else if(pinType === 'multiple pin'){
      path = data.uploadPath.multiplePin;
  	} else if(pinType === 'plate'){
 	  path = data.uploadPath.plate;
  	} else {
  	  path = data.uploadPath.pinPlate;
  	}
  	uploadPage.upload(path);
  });

  this.When(/^User verifies whether upload is successful for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
    if(pinType === 'single pin'){
      uploadPage.verifyUpload(singlePinExpectedData.projectName);
    } else if(pinType === 'multiple pin'){
        uploadPage.verifyUpload(multiplePinExpectedData.projectName);
    } else if(pinType === 'plate'){
    	uploadPage.verifyUpload(plateData.projectName);
    } else {
        uploadPage.verifyUpload(pinAndPlateData.projectName);
    }
  });

  this.When(/^User defines quotation condition for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if(pinType === 'single pin'){
      uploadPage.quotationConditionFill(singlePinExpectedData.quotationCondition);
    } else if(pinType === 'multiple pin'){
        uploadPage.quotationConditionFill(multiplePinExpectedData.quotationCondition);
    } else if(pinType === 'plate'){
		uploadPage.quotationConditionFill(plateData.quotationCondition);
    } else {
        uploadPage.quotationConditionFill(pinAndPlateData.quotationCondition);
    }

  });

  this.Then(/^User checks whether thumb nail of 3D appears for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
  	if(pinType === 'single pin') {
      uploadPage.checkThumbNail('single-pin-expected/single_pin_thumbnail.png');
  	} else if(pinType === 'multiple pin') {
  	    uploadPage.checkThumbNail('multiple-pin-expected/multiple_pin_thumbnail.png');
  	} else if(pinType === 'plate') {
  		uploadPage.checkThumbNail('plate-expected/plate_thumbnail.png');
  	} else {
  		uploadPage.checkThumbNail('pin-plate-expected/pin_plate_thumbnail.png');
  	}
  });

  this.When(/^User verifies project name and price for ((single|multiple) pin|plate|pin and plate)$/, (pinType) => {
	if(pinType === 'single pin') {
      uploadPage.checkNameAndPrice(singlePinExpectedData.projectName);
  	} else if(pinType === 'multiple pin') {
  	  uploadPage.checkNameAndPrice(multiplPinExpectedData.projectName);
  	} else if(pinType === 'plate') {
  	  uploadPage.checkNameAndPrice(plateData.projectName);
  	} else {
  	  uploadPage.checkNameAndPrice(pinPlate.projectName);
  	}
  });

 };