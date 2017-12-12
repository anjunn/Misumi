let Page = require('./page');
let data = require('../data/input_data/dataset.json');
let expected_data = require('../data/expected_results/multiple_pin_expected.json');
let multiplePinData = require('../data/input_data/multiple_pin.json');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');
let base64Img = require('base64-img');
var order;

let singlePin = {

  quantity: { get: function () { return browser.element('//*[@class="customInput"]//input[@type="number"]'); } },
  material: { get: function () { return browser.element('//*[@name="materialId"]'); } },
  surfaceTreatment: { get: function () { return browser.element('//*[@name="surfaceId"]'); } },
  tolerance:{ get: function () { return browser.element('//*[@name="toleranceClassId"]'); } },
  getEstimate:{ get: function () { return browser.element('//*[contains(text(),"見積りに進む")]'); } },
  thumbnail: { get : function() { return browser.element('//*[@class="dataBox"]//..//*[@class="figureBox"]//img'); } },
  quantityChange: { get: function () { return browser.element('//input[@id="0"]');}},
  checkBox: { get: function () { return browser.element('//*[@id="main"]/div[2]/div/div[1]/div/label/span');}},
  placeOrder: { get: function () { return browser.element('//*[contains(text(),"注文を確定する")]');}},
  logoutUser: { get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logout: { get: function () { return browser.element('//*[@id="logoutButton"]');}},
  frame: { get: function () { return browser.element('//*[@class="boxCheckbox"]');}},
  groupValue: {value: function (t) {return browser.element(`(//*[@class="groupItemCount"])[${t}]`); }},
  groupImage: { value: function (t) { return browser.element(`(//*[@class="group"]//img)[${t}]`);}},
  cart: { get: function () { return browser.element('//*[@id="boxAmount"]//..//*[@onclick="checkOrderCondition();"]');}},
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); } },
  customerNumberInput: { get: function () { return browser.element('//*[contains(text(),"一括入力") and @class="js-modal notEasescroll"]');}},
  customerNumberPart1: { get: function () { return browser.element('//*[@class="input"]//input[1]');}},
  customerNumberPart2: { get: function () { return browser.element('//*[@class="input"]//input[2]');}},
  Okbutton: { get: function () { return browser.element('//*[@class="btn"]//*[contains(text(),"一括入力")]');}},
  thankYouHeading: { get: function () { return browser.element('//*[@id="main"]/div/h1');}},
  goToHistory: { get: function () { return browser.element('//*[contains(text(),"この注文の履歴詳細へ")]');}},
  orderNo: { get: function () { return browser.element('//*[@id="main"]/div/div[1]/div[3]/strong');}},
  verifyOrderNo: { get: function () { return browser.element('//*[@id="main"]/div/div/div/div[1]/div/p[2]/span');}},
  price: { get: function () { return browser.element('(//*[@class="price"]//span[2])[1]');}},
  productName: { get: function () { return browser.element('(//*[@class="projectname"]//a)[1]');}},
    fileUploadProductName: { get: function () { return browser.element('//*[@class="filename displayFileName"]');}},
  productDetailsPageProductName: { get: function () { return browser.element('//*[@id="header3d"]/ul/li[4]/label');}},
  productDetailsAmount: { get: function () { return browser.element('//*[@class="amountText"]//span');}},
 
  verifyUpload: {
    value: function() {
      this.fileUploadProductName.waitForVisible();
      expect(this.fileUploadProductName.getText()).to.be.equal(expected_data.project_detailsFileUpload.project_name);
      this.getEstimate.isVisible();
    }
  },
  quotationConditionFill: {
    value: function() {
      this.quantity.waitForEnabled();
      this.material.selectByVisibleText(multiplePinData.quotationCondition.material);
      this.surfaceTreatment.selectByVisibleText(multiplePinData.quotationCondition.surfaceTreatment);
      this.tolerance.selectByVisibleText(multiplePinData.quotationCondition.ToleranceGrade);
      this.getEstimate.click();
    }
  },
  checkThumbNail: {
    value: function() {
      browser.waitForLoading();
      this.thumbnail.waitForVisible();
      var thumbnailData = this.thumbnail.getAttribute('src');
      var expectedData = base64Img.base64Sync('./data/screens/expected_screens/multiple_pin_expected/multiple_pin_thumbnail.png');
      expect(thumbnailData).to.be.equal(expectedData);
    }
  },
   priceName: {
    value: function() {
      expect(this.productName.getText()).to.be.equal(expected_data.project_detailsThumbnail.project_name);
      expect(this.price.getText()).to.be.equal(expected_data.project_detailsThumbnail.project_price);
    }
  },
  openProject: {
    value: function() {
      browser.pause(1000);
      this.thumbnail.waitForVisible();
      this.thumbnail.click();
    }
  },
  compareImage: {
    value: function() {
      this.arrow.waitForVisible();
      this.arrow.click();
      browser.pause(3000);
      browser.saveScreenshot('./data/screens/actual_screens/multiple_pin.png');
      this.arrow.click();
      var actualImage = fs.createReadStream('./data/screens/actual_screens/multiple_pin.png').pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./data/screens/expected_screens/multiple_pin_expected/multiple_pin_expected.png').pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var totalPixels = 768000;
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.1});
        var expectedDiff = ( (100 - expected_data.imageAccuracy) / 100 ) * totalPixels;
        console.log("Expected Diff: " + expectedDiff + ", Actual Diff: " + pixelDiff);
        expect(pixelDiff).to.be.below(expectedDiff);
      }
    }
  },
  quotionConditionInPartsView: {
    value: function() {
      this.quantityChange.waitForEnabled();
      browser.execute(function (quantity) {
        document.querySelector('input[id="0"]').value = quantity;
      }, multiplePinData.quotionConditionInPartsView.quantity);
      this.frame.click();
    }
  },
  checkGrouping:{
    value: function() {
      for(var i=1;i<=4;i++) {
        const groupValuePos = browser.elementIdLocation(this.groupValue(i).value.ELEMENT);
        browser.scroll(groupValuePos.value.x, groupValuePos.value.y);
        if(typeof this.groupValue(i).getText()!="undefined")
         {
           console.log(this.groupValue(i).getText());
           this.groupImage(i).isVisible();
         }
      }
    }
  },

   checkTotal: {
    value: function() {
     this.productDetailsPageProductName.waitForVisible();
     expect(this.productDetailsPageProductName.getText()).to.be.equal(expected_data.product_detail_page.project_name);
     expect(this.productDetailsAmount.getText()).to.be.equal(expected_data.product_detail_page.total);
     this.cart.isVisible();
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
      browser.pause(1000);
      this.customerNumberInput.waitForVisible();
      const searchButtonPos = browser.elementIdLocation(this.customerNumberInput.value.ELEMENT);
      browser.scroll(searchButtonPos.value.x, searchButtonPos.value.y-80);
      this.customerNumberInput.click();
      this.customerNumberPart1.waitForEnabled();
      this.customerNumberPart1.setValue("ERR");
      this.customerNumberPart2.setValue("1234");
      this.Okbutton.click();
      this.checkBox.waitForEnabled();
      this.checkBox.click();
      this.placeOrder.click();
    }
  },
  checkTitleThankYou:{
    value: function() {
      this.thankYouHeading.waitForEnabled();
      var title = this.thankYouHeading.getText();
      expect(title).to.equal(expected_data.thankyou.heading);
      this.orderNo.waitForVisible();
      order = this.orderNo.getText();
    }
  },
  checkHistory:{
    value: function() {
      this.goToHistory.waitForEnabled();
      this.goToHistory.click();
      this.verifyOrderNo.waitForVisible();
      var verifyOrder = this.verifyOrderNo.getText();
      expect(order).to.equal(verifyOrder);
    }
  },
};

module.exports = Object.create(Page,singlePin);