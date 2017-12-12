
let upLoadPage= require('../functions/upload.js');
let data = require('../Data/input_data/dataset.json');
let multiplePinPage= require('../functions/multiple_pin.js');
let loginPage= require('../functions/login.js');

module.exports = function () {

  this.Given(/^Upload 3D data for multiple pin$/, () => {
    url=data.uploadPath.multiple_pin;
    upLoadPage.upload(url);
  });

   this.When(/^Verify if upload is successfull for multiple pin$/, () => {
    multiplePinPage.verifyUpload();
  });

  this.When(/^User define quotation condition for the multple pin$/, () => {
    multiplePinPage.quotationConditionFill();
  });

  this.Then(/^Check 3D Thumb nail of multiple pins appears$/, () => {
    multiplePinPage.checkThumbNail();
  });
   this.When(/^User verify project name and price for multiple pin$/, () => {
    multiplePinPage.priceName();
  });

  this.Given(/^User Open the uploaded multiple pin project$/, () => {
    multiplePinPage.openProject();
  });

  this.When(/^User check feature recognition$/, () => {
    multiplePinPage.compareImage();
  });

  this.When(/^Define quotation condition in parts view for multiple pin$/, () => {
    multiplePinPage.quotionConditionInPartsView();
  });

  this.When(/^User Check grouping$/, () => {
    multiplePinPage.checkGrouping();
  });

  this.When(/^User verify if product total and procced to order button is enabled for multiple pin$/, () => {
    multiplePinPage.checkTotal();
  });
  this.Then(/^Place the order for the multiple pins$/, () => {
    multiplePinPage.addToCart();
    multiplePinPage.orderPage();
  });

  this.Then(/^User is taken to Thankyou page$/, () => {
    multiplePinPage.checkTitleThankYou();
  });

  this.When(/^Go to order history and check the product$/, () => {
    multiplePinPage.checkHistory();
    loginPage.logoutFunction();
  });
};