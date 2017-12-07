let Page = require('./page');
let data = require('../Data/dataset.js');
let singlePinData = require('../Data/SinglePin.js');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');

let singlePin = {

  quantity: { get: function () { return browser.element('//*[@class="customInput"]//input[@type="number"]'); } },
  material: { get: function () { return browser.element('//*[@name="materialId"]'); } },
  surfaceTreatment: { get: function () { return browser.element('//*[@name="surfaceId"]'); } },
  tolerance:{ get: function () { return browser.element('//*[@name="toleranceClassId"]'); } },
  getEstimate:{ get: function () { return browser.element('//*[contains(text(),"見積りに進む")]'); } },
  thumbnail: { get : function() { return browser.element('//*[@class="dataBox"]//..//*[@class="figureBox"]//img'); } },
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); } },
  quantityChange: { get: function () { return browser.element('//*[@id="0"]'); } },

  quotationConditionFill: {
    value: function() {
      browser.waitForLoading();
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
      // var actualImage = fs.createReadStream('./Data/screens/singlepinwrong.png').pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./Data/screens/singlepinexpected.png').pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.1});
        expect(pixelDiff).to.equal(0);
      }
    }
  },
  quotionConditionInPartsView: {
    value: function() {
      this.quantityChange.setValue(singlePinData.quotionConditionInPartsView.quantity);
    }
  }
};

module.exports = Object.create(Page,singlePin);