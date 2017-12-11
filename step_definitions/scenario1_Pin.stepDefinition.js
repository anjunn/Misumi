
let upLoadPage= require('../functions/upload.js');
let data = require('../data/input_data/dataset.json');
let singlePinPage= require('../functions/single_pin.js');
let loginPage= require('../functions/login.js');

module.exports = function () {

  this.Given(/^Upload 3D data for pin$/, () => {
    url=data.uploadPath.single_pin;
    upLoadPage.upload(url);
  });

  this.When(/^User define quotation condition for the pin$/, () => {
    singlePinPage.quotationConditionFill();
  });

  this.Then(/^Thumb nail of 3D appears$/, () => {
    singlePinPage.checkThumbNail();
  });

  this.Given(/^User Open the uploaded project$/, () => {
    singlePinPage.openProject();
  });

  this.When(/^Define quotation condition in parts view$/, () => {
    singlePinPage.compareImage();
    singlePinPage.quotionConditionInPartsView();
    singlePinPage.checkQuotation();
  });

  this.Then(/^Place the order$/, () => {
    singlePinPage.addToCart();
    singlePinPage.orderPage();
  });

  this.Then(/^User is taken to the Thankyou page$/, () => {
    singlePinPage.checkTitle();
  });

  this.When(/^Go to order history$/, () => {
    singlePinPage.checkHistory();
    loginPage.logoutFunction();
  });
};