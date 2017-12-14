let Page = require('./page');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');
let expectedData = require('../data/expected-results/common.json');

let  projectPage = {

  thumbnail: { get : function() { return browser.element('//*[@class="dataBox"]//..//*[@class="figureBox"]//img'); }},
  chatBox: { get : function() { return browser.element('//div[@id="aibis-waiting"]/div[@class="titlebar"]'); }},
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); }},
  singlePinPart: { get: function() { return browser.element('//*[@id="lstPartsBuy"]//div/span[@class="class"]'); }},
  quantityChange: { get: function () { return browser.element('//input[@id="0"]'); }},
  priceText: { get: function () { return browser.element('//*[@id="boxAmount"]//span[@class="textBold"]'); }},
  multiplePinPart: { value: function(part) { return browser.element(`(//*[@id="lstPartsBuy"]//div/span[@class="class"])[${part}]`); }},
  groupValue: { value: function (n) {return browser.element(`(//span[@class="groupItemCount"])[${n}]`); }},
  groupImage: { value: function (n) { return browser.element(`(//*[@class="group"]//img)[${n}]`);}},

  openProject: {
    value: function() {
      this.thumbnail.waitForVisible();
      this.thumbnail.click();
      this.arrow.waitForVisible();
      browser.params.projectPageUrl = browser.getUrl().match(/^[^&]*/)[0];
    }
  },
  compareImage: {
    value: function(actualImagePath, expectedImagePath) {
      this.chatBox.waitForVisible();
      this.arrow.waitForVisible();
      this.arrow.click();
      browser.pause(4000);
      browser.saveScreenshot('./data/screens/actual-screens/' + actualImagePath);
      this.arrow.click();
      var actualImage = fs.createReadStream('./data/screens/actual-screens/' + actualImagePath).pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./data/screens/expected-screens/' + expectedImagePath).pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var totalPixels = 768000;
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.1});
        var expectedDiff = ( (100 - expectedData.imageAccuracy) / 100 ) * totalPixels;
        console.log("Expected Diff: " + expectedDiff + ", Actual Diff: " + pixelDiff);
        expect(pixelDiff).to.be.below(expectedDiff);
      }
    }
  },
  quotionConditionInPartsView: {
    value: function(quantity) {
      this.quantityChange.waitForEnabled();
      var price = this.priceText.getText();
      expect(price).to.not.be.null;
      browser.execute(function (quantity) {
        element = document.querySelector('input[id="0"]');
        element.value = quantity;
        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          element.dispatchEvent(evt);
        } else {
          element.fireEvent("onchange");
        }
      }, quantity);
      browser.pause(3000);
      var newPrice  = this.priceText.getText();
      browser.params.totalPrice = newPrice;
      expect(newPrice).to.be.above(price);
    }
  },
  checkSinglePinName: {
    value: function(names) {
      this.singlePinPart.waitForVisible();
      var partName = this.singlePinPart.getText();
      expect(partName).to.be.equal(names.part1);
    }
  },
  checkMultiplePinName: {
    value: function(names) {
      for (var i = 1; i <= 7; i++) {
        browser.moveToObject(`(//*[@id="lstPartsBuy"]//div/span[@class="class"])[${i}]`);
        var partName = this.multiplePinPart(i).getText();
        expect(partName).to.be.equal(names[`part${i}`])
      }
    }
  },
  checkGrouping:{
    value: function(grouping) {
      for (var i = 1; i <= 4; i++) {
        browser.moveToObject(`(//*[@class="groupItemCount"])[${i}]`);
        var parts = this.groupValue(i).getText();
        expect(parts).to.be.equal(`[${grouping[i-1]}]`);
        this.groupImage(i).isVisible();
      }
    }
  },
};

module.exports = Object.create(Page, projectPage);