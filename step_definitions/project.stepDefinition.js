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

  this.When(/^User does Feature Recognition for ((single|multiple) pin|plate|pin and plate|core pin)$/, (pinType) => {
    if (pinType === 'single pin') {
      projectPage.compareImage('single-pin.png', 'single-pin/single-pin.png');
    } else if (pinType === 'multiple pin') {
      projectPage.compareImage('multiple-pin.png', 'multiple-pin/multiple-pin.png');
    } else if (pinType === 'plate') {
      projectPage.compareImage('plate.png', 'plate/plate.png');
    } else if (pinType === 'pin and plate') {
      projectPage.compareImage('pin-and-plate.png', 'pin-and-plate/pin-and-plate.png');
    }
    else if (pinType === 'core pin') {
      projectPage.compareImage('core-pin.png', 'multiple-pin/core-pin.png');
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

  this.Then(/^User defines quotation condition in parts view for ((single|multiple) pin|pin and plate)$/, (pinType) => {
  	if(pinType === 'single') {
      projectPage.quotionConditionInPartsView(singlePinInputData.quotationConditionInPartsView.quantity);
  	} else if (pinType === 'multiple pin') {
      projectPage.quotionConditionInPartsView(multiplePinInputData.quotationConditionInPartsView.quantity);
    } else if (pinType === 'pin and plate') {
      projectPage.quotionConditionInPartsView(pinAndPlateInputData.quotationConditionInPartsView.quantity);
    }
  });

  this.When(/^User checks grouping$/, () => {
    projectPage.checkGrouping(multiplePinExpectedData.grouping);
  });

  this.Then(/^User request for manual quotation in parts view for (plate|pin and plate)$/, (pinType) => {
    if (pinType === 'pin and plate') {
      projectPage.estimateConditionPartsview(pinAndPlateInputData.estimateCondition, pinType);
    } else if (pinType === 'plate') {
      projectPage.estimateConditionPartsview(plateInputData.estimateCondition, pinType);
    }
  }); 

  this.Then(/^User check unit price and icon in parts view$/, () => {
    projectPage.validateManualIconInPartsView();
    projectPage.validatePriceInPartsView();
  });

  this.Then(/^User downloads the pdf$/, () => {
    projectPage.downloadPdf();
  });

   this.Then(/^User reads the contents of a pdf$/, () => {
    projectPage.readContentsPdf();
  });
   

  this.Then(/^User downloads the csv$/, () => {
    projectPage.downloadCsv();
  });
   this.When(/^User selects a part by product type and selects Core pins$/, () => {
    projectPage.selectByProductType();
  });
    this.Then(/^Check if all core pins are selected and finally deselect$/, () => {

    projectPage.verifyCorePinSelected(multiplePinExpectedData.partNames,7,multiplePinExpectedData.corePinCount)
  });
    this.When(/^User selects filter and take CorePin$/, () => {
    projectPage.selectFilterTakeCorePin();
  });
    this.When(/^User verifies if filter has been proper$/, () => {
    projectPage.verifyFilterCorePin(multiplePinExpectedData.partNames.part2,7,multiplePinExpectedData.corePinCount);
  });
     this.When(/^User gives Customer ordering number manually$/, () => {
    projectPage.customerOrdeingNumberManual(14,multiplePinInputData.customerOrderingNumberPart1,multiplePinInputData.customerOrderingNumberPart2);
  });
     this.When(/^User gives Customer ordering number batch input$/, () => {
    projectPage.customerOrdeingNumberBatchInput();
  });
     this.When(/^User verifies Customer ordering number batch input$/, () => {
    projectPage.verifyBatchInput(multiplePinExpectedData.batchInput,14);
  });
     this.Then(/^User resets the batch input$/, () => {
    projectPage.resetBatchInput();
  });
       this.When(/^User gives Customer ordering number using input wizard$/, () => {
    projectPage.customerOrdeingNumberInputWizard(multiplePinInputData.inputWizardFunction1,multiplePinInputData.inputWizardFunction2);
  });
         this.Then(/^User verifies Customer ordering number using input wizard$/, () => {
    projectPage.verifyInputWizard(multiplePinExpectedData.wizardInput,multiplePinExpectedData.wizardInputprojectName,14);
  });
    this.When(/^User selects a part and changes the material$/, () => {
    projectPage.selectCorePin();
  });
     this.Then(/^User updates the quotation and verifies the change$/, () => {
    projectPage.updateQuotation(multiplePinExpectedData.materialChange);
  });
};