
let upLoadPage= require('../functions/upload.js');
let data = require('../Data/dataset.js');
let singlePinPage= require('../functions/singlePin.js');

module.exports = function () {

  this.Given(/^Upload 3D data for pin$/, () => {
   url=data.uploadPath.url1;
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
   singlePinPage.quotionConditionInPartsView();
  });

   this.Then(/^Place the order$/, () => {
   singlePinPage.placeOrder();
  });


  };