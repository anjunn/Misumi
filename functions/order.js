let Page = require('./page');
let data = require('../data/input-data/dataset.json');
let order;
/**
 * order Page Object
 *
 * @class functions/order
 * @type {Page}
 */
let  orderPage = {
  /**
   * define elements
   */
  proceedToOrderButton: { get: function () { return browser.element('//*[@id="boxAmount"]//..//*[@onclick="checkOrderCondition();"]'); }},
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
  priceText: { get: function () { return browser.element('(//table[@class="table06"]/tbody//td)[6]');}},
  okButton: { get: function () { return browser.element('//li[@id="okBtn"]//a'); }},
  checkBoxToWOS: { get: function () { return browser.element('(//span[@class="check"])[3]'); }},
  buttonToWOS: { get: function () { return browser.element('//p[@class="btn multiLine btnColor01 outlink"]'); }},
  closeButtonPopUp: { get: function () { return browser.element('//li[@id="closeBtn"]'); }},
  collectiveInputButton: { get: function () { return browser.element('(//li[@class="btn"])[3]'); }},
  modelNumber: { get: function () { return browser.element('//p[@class="modelNum"]'); }},
  quantityOrderpage: { get: function () { return browser.element('(//span[@class="textBold"])[5]'); }},
  priceInsideOrderPage: { get: function () { return browser.element('(//td[@class="elementRight"])[3]//span'); }},
  purchaseOrderNumber: { get: function () { return browser.element('(//div[@class="titleText"]//span)[2]'); }},
  totalAmount: { get: function () { return browser.element('(//span[@class="textBold"])[3]'); }},
  projectName: { get: function () { return browser.element('(//h2[@class="historyTitle"]//a)[1]'); }},
  projectNameDetailsPage: { get: function () { return browser.element('//h2[@class="historyTitle"]'); }},
  purchaseOrderNumberDetailsPage: { get: function () { return browser.element('(//div[@class="col mainCol"]//span)[2]'); }},
  amountDetailsPage: { get: function () { return browser.element('(//div[@class="col mainCol"]//span)[3]'); }},

  /*
   * User goes to the order page
   */
  goToOrderPage: {
    value: function() {
      this.proceedToOrderButton.waitForEnabled();
      this.proceedToOrderButton.click();
      if(this.okButton.isVisible())
        this.okButton.click();
    }
  },

  /*
   * Verifies if heading and product name match
   */
  orderPageValidation: {
    value: function(heading) {
      this.customerNumberInput.waitForVisible();
      expect(this.orderPageHeading.getText()).to.be.equal(heading);
      const productNamePos = browser.elementIdLocation(this.orderPageProductName.value.ELEMENT);
      browser.scroll(productNamePos.value.x, productNamePos.value.y);
      this.orderPageProductName.waitForVisible();
      var fileName= browser.params.fileName || require('../data/cad-drawings/filename.json').fileName
      expect(this.orderPageProductName.getText()).to.be.equal(fileName);
    }
  },

  /*
   * User enters the customer input number
   */
   customerInputSinglePin: {
    value: function() {
      browser.smallWait();
      this.customerNumberInput.waitForVisible();
      const searchButtonPos = browser.elementIdLocation(this.customerNumberInput.value.ELEMENT);
      browser.scroll(searchButtonPos.value.x, searchButtonPos.value.y-80);
      this.customerNumberInput.click();
      this.customerNumberPart1.waitForEnabled();
      this.customerNumberPart1.setValue("ERR");
      this.customerNumberPart2.setValue("1234");
      this.collectiveInputButton.waitForVisible();
      this.collectiveInputButton.click();
    }
   } ,

  /*
   * Get quantity and model number and price
   */
  getQuantityModelNumberPrice: {
    value: function() {
      this.modelNumber.waitForVisible();
      browser.params.modelNumberOrderPage=this.modelNumber.getText();
      browser.params.quantiyOrderpage=this.quantityOrderpage.getText();
      browser.params.priceOrderPage=this.priceInsideOrderPage.getText();
    }
  },

  /*
   * User places the order
   */
  placeOrder: {
    value: function() {
      this.customerInputSinglePin();
      this.checkBox.waitForEnabled();
      this.checkBox.click();
      this.placeOrderButton.click();
    }
  },

  /*
   * User verifies if taken Thankyou page
   */
  checkTitleThankYou: {
    value: function(heading) {
      this.thankYouHeading.waitForEnabled();
      var title = this.thankYouHeading.getText();
      expect(title).to.equal(heading);
    }
  },

  /*
   * User goes to history page
   */
  goToOrderHistory: {
    value: function() {
      this.goToHistory.waitForVisible();
      this.goToHistory.click();
      this.priceText.waitForVisible();
      browser.params.totalPrice = this.priceText.getText();
    }
  },

  /*
   * User redirects to Wos page
   */

  clickBoxAndRedirectToWos: {
    value: function() {
     this.getQuantityModelNumberPrice();
     this.customerInputSinglePin();
     this.checkBoxToWOS.waitForEnabled();
     this.checkBoxToWOS.click();
     this.buttonToWOS.waitForVisible();
     this.buttonToWOS.click();
     browser.tinyWait();
     if(this.closeButtonPopUp.isVisible()){
      this.closeButtonPopUp.click();
     }
     browser.switchTab(browser.windowHandles().value[1]);
    }
  },

  /*
   * User verifies the order
   */
  verifyOrder: {
    value: function() {
      var flag=0, count=0;
      while(count<=20){
        browser.smallWait();
        if(this.purchaseOrderNumber.isVisible()){
          if(this.purchaseOrderNumber.getText()===browser.params.purchaseOrderNumber){
            this.projectName.waitForVisible();
            console.log("   Actual   "+" ******** "+"   Expected   ");
            console.log(this.purchaseOrderNumber.getText()+" ******** "+browser.params.purchaseOrderNumber);
           if(this.projectName.getText()===browser.params.fileName) {  
              flag=1;
              break;
            }
          }
        }  
      browser.WaitForOneminute();
      browser.refresh();
      count=count+1;
          
      }
      expect(flag).to.be.equal(1);
    }
  },

  /*
   * User verifies the amount
   */

  verifyAmount: {
    value: function() {
    this.totalAmount.waitForVisible();
    var amount=this.totalAmount.getText();
    expect(amount).to.be.equal(browser.params.priceOrderPage);
    }
  },

  /*
   * User verifies the project details
   */

  verifyDetailsOfProduct: {
    value: function() {
     this.projectName.waitForVisible();
     this.projectName.click();
     this.projectNameDetailsPage.waitForVisible();
     expect(browser.params.fileName).to.be.equal(this.projectNameDetailsPage.getText());
     expect(browser.params.priceOrderPage).to.be.equal(this.amountDetailsPage.getText());
     expect(browser.params.purchaseOrderNumber).to.be.equal(this.purchaseOrderNumberDetailsPage.getText());
    }
  },
};

module.exports = Object.create(Page, orderPage);