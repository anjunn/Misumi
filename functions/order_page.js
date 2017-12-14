let Page = require('./page');
let order;

let  orderPage = {

  cart: { get: function () { return browser.element('//*[@id="boxAmount"]//..//*[@onclick="checkOrderCondition();"]'); }},
  customerNumberInput: { get: function () { return browser.element('//*[contains(text(),"一括入力") and @class="js-modal notEasescroll"]'); }},
  orderPageHeading: { get: function () { return browser.element('//*[@class="heading01"]');}},
  orderPageProductName: { get: function () { return browser.element('//*[@class="title"]//span');}},
  customerNumberPart1: { get: function () { return browser.element('//*[@class="input"]//input[1]');}},
  customerNumberPart2: { get: function () { return browser.element('//*[@class="input"]//input[2]');}},
  Okbutton: { get: function () { return browser.element('//*[@class="btn"]//*[contains(text(),"一括入力")]');}},
  checkBox: { get: function () { return browser.element('//*[@id="main"]/div[2]/div/div[1]/div/label/span');}},
  placeOrderButton: { get: function () { return browser.element('//*[contains(text(),"注文を確定する")]');}},
  thankYouHeading: { get: function () { return browser.element('//*[@id="main"]/div/h1');}},
  orderNo: { get: function () { return browser.element('//*[@id="main"]/div/div[1]/div[3]/strong');}},
  goToHistory: { get: function () { return browser.element('//*[contains(text(),"この注文の履歴詳細へ")]');}},
  verifyOrderNo: { get: function () { return browser.element('//*[@id="main"]/div/div/div/div[1]/div/p[2]/span');}},

  goToOrderPage: {
    value: function() {
      this.cart.waitForEnabled();
      this.cart.click();
    }
  },
  orderPageValidation: {
    value: function(heading) {
      this.customerNumberInput.waitForVisible();
      expect(this.orderPageHeading.getText()).to.be.equal(heading);
      browser.moveToObject('//*[@class="title"]//span', 0, -80);
      expect(this.orderPageProductName.getText()).to.be.equal(browser.params.fileName);
    }
  },
  placeOrder: {
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
      this.placeOrderButton.click();
    }
  },
  checkTitleThankYou: {
    value: function(heading) {
      this.thankYouHeading.waitForEnabled();
      var title = this.thankYouHeading.getText();
      expect(title).to.equal(heading);
    }
  },
  checkHistory: {
    value: function() {
      this.goToHistory.waitForEnabled();
      this.goToHistory.click();
      this.verifyOrderNo.waitForVisible();
    }
  },
};

module.exports = Object.create(Page, orderPage);