let data = require('../Data/input_data/dataset.json');
let expectedData = require('../data/expected_results/common.json');
let multiplePinExpectedData = require('../data/expected_results/multiple_pin_expected.json');
let loginPage = require('../functions/login.js');
let uploadPage = require('../functions/upload.js');
let projectPage = require('../functions/project_page');
let orderPage = require('../functions/order_page.js');

module.exports = function () {

  this.Given(/^Upload 3D data for multiple pin$/, () => {
    path = data.uploadPath.multiplePin;
    uploadPage.upload(path);
  });

  this.When(/^Verify if upload is successfull for multiple pin$/, () => {
    uploadPage.verifyUpload(multiplePinExpectedData.projectName);
  });

  this.When(/^User define quotation condition for the multple pin$/, () => {
    uploadPage.quotationConditionFill(multiplePinExpectedData.quotationCondition);
  });

  this.Then(/^Check 3D Thumb nail of multiple pins appears$/, () => {
    uploadPage.checkThumbNail('multiple_pin_expected/multiple_pin_thumbnail.png');
  });
   this.When(/^User verify project name and price for multiple pin$/, () => {
    uploadPage.checkNameAndPrice(multiplePinExpectedData.projectName);
  });

  this.Given(/^User Open the uploaded multiple pin project$/, () => {
    projectPage.openProject();
  });

  this.When(/^User check feature recognition$/, () => {
    // projectPage.compareImage('multiple_pin.png', 'multiple_pin_expected/multiple_pin_expected.png');
  });

  this.Then(/^Define quotation condition in parts view for multiple pin$/, () => {
    projectPage.quotionConditionInPartsView(multiplePinExpectedData.quotationConditionInPartsView.quantity, 'multiplePin');
  });

  this.When(/^User verify part names for multiple pin$/, () => {
    projectPage.checkMultiplePinName(multiplePinExpectedData.partNames);
  });

  this.When(/^User Check grouping$/, () => {
    projectPage.checkGrouping(multiplePinExpectedData.grouping);
  });

  this.When(/^User goes to order page of multiple pin$/, () => {
    orderPage.goToOrderPage();
  });

  this.Then(/^Check if product name and order details is shown in order page for multiple pin$/, () => {
    orderPage.orderPageValidation(expectedData.orderPageHeading);
  });

  this.Then(/^Place the order for the multiple pins$/, () => {
   orderPage.placeOrder();
  });

  this.Then(/^User is taken to Thankyou page$/, () => {
    orderPage.checkTitleThankYou(expectedData.thankyouHeading);
  });

  this.When(/^Go to order history and check the product$/, () => {
    orderPage.checkHistory();
    loginPage.logoutFunction();
  });
};