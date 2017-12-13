
let data = require('../data/input_data/dataset.json');
let expectedData = require('../data/expected_results/common.json');
let singlePinExpectedData = require('../data/expected_results/single_pin_expected.json');
let loginPage = require('../functions/login.js');
let uploadPage = require('../functions/upload.js');
let projectPage = require('../functions/project_page');
let orderPage = require('../functions/order_page');

module.exports = function () {

  this.Given(/^Upload 3D data for pin$/, () => {
    path = data.uploadPath.singlePin;
    uploadPage.upload(path);
  });

  this.When(/^Verify if upload is successfull for single pin$/, () => {
    uploadPage.verifyUpload(singlePinExpectedData.projectName);
  });

  this.When(/^User define quotation condition for the pin$/, () => {
    uploadPage.quotationConditionFill(singlePinExpectedData.quotationCondition);
  });

  this.Then(/^Check if Thumb nail of 3D appears$/, () => {
    uploadPage.checkThumbNail('single_pin_expected/single_pin_thumbnail.png');
  });

  this.When(/^User verify project name and price for single pin$/, () => {
    uploadPage.checkNameAndPrice(singlePinExpectedData.projectName);
  });

  this.Given(/^User Open the uploaded project$/, () => {
    projectPage.openProject();
  });

  this.When(/^User does Feature Recognition for single pin$/, () => {
    projectPage.compareImage('single_pin.png', 'single_pin_expected/single_pin_expected.png');
  });

  this.Then(/^User verify part names for single pin$/, () => {
    projectPage.checkSinglePinName(singlePinExpectedData.partNames);
  });

  this.Then(/^Define quotation condition in parts view$/, () => {
    projectPage.quotionConditionInPartsView(singlePinExpectedData.quotationConditionInPartsView.quantity, 'singlePin');
  });

  this.Given(/^User goes to order page single pin$/, () => {
    orderPage.goToOrderPage();
  });

  this.Then(/^Check if product name and order details is shown in order page for single pin$/, () => {
    orderPage.orderPageValidation(expectedData.orderPageHeading);
  });

  this.Then(/^Place the order$/, () => {
    orderPage.placeOrder();
  });

  this.Then(/^User is taken to the Thankyou page$/, () => {
    orderPage.checkTitleThankYou(expectedData.thankyouHeading);
  });

  this.When(/^Go to order history$/, () => {
    orderPage.checkHistory();
    loginPage.logoutFunction();
  });
};