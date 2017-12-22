let Page = require('./page');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');
let expectedData = require('../data/expected-results/common.json');
/**
 * project Page Object
 *
 * @class functions/project
 * @type {Page}
 */
let  projectPage = {
  /**
   * define elements
   */
  thumbnail: { get : function() { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//figure/img'); }},
  chatBox: { get : function() { return browser.element('//div[@id="aibis-waiting"]/div[@class="titlebar"]'); }},
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); }},
  partsName: { value: function (part) { return browser.element(`(//span[@class="class"])[${part}]`); }},
  quantityChange: { get: function () { return browser.element('(//input[@type="number"])[1]'); }},
  priceText: { get: function () { return browser.element('//*[@id="boxAmount"]//span[@class="textBold"]'); }},
  partsPriceText: { value: function (n) { return browser.element(`(//p[@class="sum"]/span)[${n}]`); }},
  groupValue: { value: function (n) {return browser.element(`(//span[@class="groupItemCount"])[${n}]`); }},
  groupImage: { value: function (n) { return browser.element(`(//*[@class="group"]//img)[${n}]`);}},
  manualQuotationPinAndPlate: { get: function () { return browser.element('//*[@id="lstPartsBuy"]/div[4]/div[2]/div/p/a'); }},
  materialFieldPartsView: { get: function () { return browser.element('//*[@id="MATERIALTYPE.ARTICLE_TYPE_ID_6.6"]'); }},
  boxButtonpartsview: { get: function () { return browser.element('//ul[@id="boxButton"]/li[4]/a'); }},
  closePopUpButton:{ get: function () { return browser.element('//li[@id="closeBtn"]/a'); }},
  manualOkIconPartsView: { get: function () { return browser.element('//span[@class="status"]//img[@src="pres/img/com_status_ic02.png"]');}},
  unitPriceManuallyQuoted: { get: function () { return browser.element('//span[@class="status"]//img[@src="pres/img/com_status_ic02.png"]/../../../../div//p[contains(@class, "amount")]//span');}},
  totalPriceDisplayedInPartsView:  { get: function () { return browser.element('//div[@id="boxAmount"]');}},
  manualQuotationPlate: { get: function () { return browser.element('//div[@class="boxInfomation"]/p/a'); }},
  

  /*
   * Open project by clicking on thumbnail
   */
  openProject: {
    value: function() {
      this.thumbnail.waitForVisible();
      this.thumbnail.click();
      this.arrow.waitForVisible();
      browser.params.projectPageUrl = browser.getUrl().match(/^[^&]*/)[0];
    }
  },

  /*
   * Compare expected image with screenshot
   */
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

   /*
   * Increse quantity of part and verify price increases
   */

  quotionConditionInPartsView: {
    value: function(quantity, isPlate = false) {
      this.quantityChange.waitForEnabled();
      if (!isPlate) {
        var price = parseInt(this.priceText.getText().replace(/,/g, ""));
        expect(price).to.not.be.null;
      }
      browser.execute(function (quantity) {
        element = document.querySelector('input[type="number"]');
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
      if (!isPlate) {
        var newPrice  = parseInt(this.priceText.getText().replace(/,/g, ""));
        expect(newPrice).to.be.above(price);
      }
    }
  },

   /*
   * Verify part names for single pin
   */
  validatePartNames: {
    value: function(names, count) {
      for (var i = 1; i <= count; i++) {
        browser.moveToObject(`(//span[@class="class"])[${i}]`);
        browser.pause(1000);
        var partName = this.partsName(i).getText();
        expect(partName).to.be.equal(names[`part${i}`]);
        if (count === 3) browser.params.pinAndPlatePrice[`part${i}`] = this.partsPriceText(i).getText();
      }
    }
  },

  /*
   * Verify grouping for multiple pin
   */
  checkGrouping: {
    value: function(grouping) {
      for (var i = 1; i <= 4; i++) {
        browser.moveToObject(`(//*[@class="groupItemCount"])[${i}]`);
        var parts = this.groupValue(i).getText();
        expect(parts).to.be.equal(`[${grouping[i-1]}]`);
        this.groupImage(i).isVisible();
      }
    }
  },

  /*
  * Request manual quotation by user for pin and pin and plate
  */

  estimateConditionPartsview: {
    value: function(estimateCondition, pinType) {
      if (pinType === 'pin and plate'){
        this.manualQuotationPinAndPlate.waitForVisible();
        this.manualQuotationPinAndPlate.click();
      } else {
        browser.pause(5000);
        this.manualQuotationPlate.waitForVisible();
        this.manualQuotationPlate.click();
      }
      this.materialFieldPartsView.waitForVisible();
      this.materialFieldPartsView.selectByVisibleText(estimateCondition.material);
      this.boxButtonpartsview.waitForEnabled();
      browser.pause(2000);
      this.boxButtonpartsview.click();
      browser.pause(2000);
      this.closePopUpButton.waitForVisible();
      this.closePopUpButton.click();
      browser.pause(2000);
    }
  },

  /*
  * Checks manually estimated icon is present
  */

  validateManualIconInPartsView: {
    value: function() {
      this.manualOkIconPartsView.waitForVisible();
      expect(this.manualOkIconPartsView.isVisible()).to.be.equal(true);
    }
  },

  /*
  * Checks unit price in parts view
  */

  validatePriceInPartsView: {
    value: function() {
      var unitPriceDisplayed = this.unitPriceManuallyQuoted.getText().match(/\d+/g).join(",");
      expect(unitPriceDisplayed).to.be.equal(expectedData.unitPrice);
    }
  },
};
  
module.exports = Object.create(Page, projectPage);
