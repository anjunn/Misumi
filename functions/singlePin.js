let Page = require('./page');
let data = require('../Data/dataset.js');
let singlePinData = require('../Data/SinglePin.js');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');
var order;

let singlePin = {

  quantity: { get: function () { return browser.element('//*[@class="customInput"]//input[@type="number"]'); } },
  material: { get: function () { return browser.element('//*[@name="materialId"]'); } },
  surfaceTreatment: { get: function () { return browser.element('//*[@name="surfaceId"]'); } },
  tolerance:{ get: function () { return browser.element('//*[@name="toleranceClassId"]'); } },
  getEstimate:{ get: function () { return browser.element('//*[contains(text(),"見積りに進む")]'); } },
  thumbnail: { get : function() { return browser.element('//*[@class="dataBox"]//..//*[@class="figureBox"]//img'); } },
  quantityChange: { get: function () { return browser.element('//*[@id="0"]');}},
  checkBox: { get: function () { return browser.element('//*[@id="main"]/div[2]/div/div[1]/div/label/span');}},
  placeOrder: { get: function () { return browser.element('//*[contains(text(),"注文を確定する")]');}},
  logoutUser: { get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logout: { get: function () { return browser.element('//*[@id="logoutButton"]');}},
  frame: { get: function () { return browser.element('//*[@class="boxCheckbox"]');}},
  cart: { get: function () { return browser.element('//*[@id="boxAmount"]//..//*[@onclick="checkOrderCondition();"]');}},
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); } },
  customerNumber: { get: function () { return browser.element('//*[@class="customInput oya"]//input');}},
  thankYouHeading: { get: function () { return browser.element('//*[@id="main"]/div/h1');}},
  goToHistory: { get: function () { return browser.element('//*[contains(text(),"この注文の履歴詳細へ")]');}},
  orderNo: { get: function () { return browser.element('//*[@id="main"]/div/div[1]/div[3]/strong');}},
  verifyOrderNo: { get: function () { return browser.element('//*[@id="main"]/div/div/div/div[1]/div/p[2]/span');}},
  
  quotationConditionFill: {
    value: function() {
      this.quantity.waitForEnabled();
      this.quantity.setValue(singlePinData.quotationCondition.quantity);
      this.material.selectByVisibleText(singlePinData.quotationCondition.material);
      this.surfaceTreatment.selectByVisibleText(singlePinData.quotationCondition.surfaceTreatment);
      this.tolerance.selectByVisibleText(singlePinData.quotationCondition.ToleranceGrade);
      this.getEstimate.click();
    }
  },
  checkThumbNail: {
    value: function() {
      browser.waitForLoading();
      this.thumbnail.waitForVisible();
      var size = this.thumbnail.getElementSize();
      expect(size.width).to.be.at.least(190);
      expect(size.height).to.be.at.least(140);
    }
  },
  openProject: {
    value: function() {
      this.thumbnail.click();
    }
  },
  compareImage: {
    value: function() {
      this.arrow.waitForVisible();
      this.arrow.click();
      browser.pause(3000);
      browser.saveScreenshot('./Data/screens/singlepin.png');
      this.arrow.click();
      var actualImage = fs.createReadStream('./Data/screens/singlepin.png').pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./Data/screens/singlepinexpected.png').pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var totalPixels = 768000;
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.2});
        var expectedDiff = ( (100 - data.imageAccuracy) / 100 ) * totalPixels;
        expect(pixelDiff).to.be.below(expectedDiff);
      }
    }
  },
  quotionConditionInPartsView: {
    value: function() {
      this.quantityChange.waitForEnabled();
      this.quantityChange.setValue(singlePinData.quotionConditionInPartsView.quantity);
      this.frame.click();
    }
  },
  addToCart:{
    value: function() {
      this.cart.waitForEnabled();
      this.cart.click();
    }
  },
  orderPage:{
    value: function() {
      this.customerNumber.waitForEnabled();
      this.customerNumber.setValue("EPP")
      this.checkBox.waitForEnabled();
      this.checkBox.click();
      this.placeOrder.click();
    }
  },
  checkTitle:{
    value: function() {
      this.thankYouHeading.waitForEnabled();
      var title = this.thankYouHeading.getText();
      expect(title).to.equal(singlePinData.thankyou.heading);
      this.orderNo.waitForVisible();
      order= this.orderNo.getText();
      console.log("ONO:" + order);
    }
  },
  checkHistory:{
    value: function() {
     this.goToHistory.waitForEnabled();
     this.goToHistory.click();
     this.verifyOrderNo.waitForEnabled();
     var verifyOrder=this.verifyOrderNo.getText();
     expect(order).to.equal(verifyOrder);    
    }
  },
};

module.exports = Object.create(Page,singlePin);