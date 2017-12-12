
let upLoadPage= require('../functions/upload.js');
let data = require('../data/input_data/dataset.json');
let singlePinPage= require('../functions/single_pin.js');
let loginPage= require('../functions/login.js');

module.exports = function () {

  this.Given(/^Upload 3D data for pin$/, () => {
    url=data.uploadPath.single_pin;
    upLoadPage.upload(url);
  });

  this.When(/^Verify if upload is successfull for single pin$/, () => {
    singlePinPage.verifyUpload();
  });

  this.When(/^User define quotation condition for the pin$/, () => {
    singlePinPage.quotationConditionFill();
  });

  this.Then(/^Check if Thumb nail of 3D appears$/, () => {
    singlePinPage.checkThumbNail();
  });
 
 this.When(/^User verify project name and price for single pin$/, () => {
    singlePinPage.priceName();
  });
  this.Given(/^User Open the uploaded project$/, () => {
    singlePinPage.openProject();
  });
 this.When(/^User does Feature Recognition for single pin$/, () => {
    singlePinPage.compareImage();
  });
  this.When(/^Define quotation condition in parts view$/, () => {
    singlePinPage.quotionConditionInPartsView();
  });
   this.When(/^Verify if quotation condition has been properly inputed$/, () => {
    singlePinPage.checkQuotation();
  });

   this.When(/^User verify if product total and procced to order button is enabled for single pin$/, () => {
    singlePinPage.checkTotal();
  });

  this.Then(/^Place the order$/, () => {
    singlePinPage.addToCart();
    singlePinPage.orderPage();
  });

  this.Then(/^User is taken to the Thankyou page$/, () => {
    singlePinPage.checkTitleThankYou();
  });

  this.When(/^Go to order history$/, () => {
    singlePinPage.checkHistory();
    loginPage.logoutFunction();
  });
};