
let upLoadPage= require('../functions/upload.js');
let data = require('../data/dataset.js');
let multiplePinPage= require('../functions/multiple_pin.js');
let loginPage= require('../functions/login.js');

module.exports = function () {

  this.Given(/^Upload 3D data for multiple pin$/, () => {
    url=data.uploadPath.url2;
    upLoadPage.upload(url);
  });

  this.When(/^User define quotation condition for the multple pin$/, () => {
    multiplePinPage.quotationConditionFill();
  });

  this.Then(/^3D Thumb nail of multiple pins appears$/, () => {
    multiplePinPage.checkThumbNail();
  });

  this.Given(/^User Open the uploaded multiple pin project$/, () => {
    multiplePinPage.openProject();
  });

  this.When(/^User check feature recognition$/, () => {
    multiplePinPage.compareImage();
  });

  this.Then(/^Place the order for the multiple pins$/, () => {
    multiplePinPage.addToCart();
    multiplePinPage.orderPage();
  });

  this.Then(/^User is taken to Thankyou page$/, () => {
    multiplePinPage.checkTitle();
  });

  this.When(/^Go to order history and check the product$/, () => {
    multiplePinPage.checkHistory();
    loginPage.logoutFunction();
  });
};