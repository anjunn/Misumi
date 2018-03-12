
let Page = require('./page');
let data = require('../data/input-data/dataset.json');
/**
 * wos Page Object
 *
 * @class functions/wos
 * @type {Page}
 */
let wosPage = {
  /**
   * define elements
   */
  modelNumber: { get: function () { return browser.element('//input[@id="detailList_0.productCode"]');}},
  modelNumberInShippingdatePage: { get: function () { return browser.element('//td[@style="word-break:break-all;"]//strong');}},
  priceInShippingDatePage: { get: function () { return browser.element('(//td[@class="right"])[2]//span');}},
  quantityInShippingDatePage: { get: function () { return browser.element('(//td[@class="right"])[1]');}},
  orderQuanity: { get: function () { return browser.element('//input[@id="detailList_0.quantity"]');}},
  nextButton:{ get: function () { return browser.element('//a[@id="dictBulk"]');}},
  nextButtonSelector: { get: function() { return `#dictBulk` } },
  closeButton: { get: function () { return browser.element('//a[@class="btnClose"]');}},
  nextButtonShippingDate: { get: function () { return browser.element('//a[@class="btnNext"]');}},
  shippingError: { get: function () { return browser.element('//div[@class="marginL10 marginT15"]//span');}},
  selectDateDropDown: { get: function () { return browser.element('//select[@name="arrivalDateList_0.inputArrivalDateString"]');}},
  selectDate: { get: function () { return browser.element('(//select[@name="arrivalDateList_0.inputArrivalDateString"]//option)[2]');}},
  tableSelector: { get: function() { return `#table_Product` } },
  modelNumberInOrderConfirmationPage: { get: function () { return browser.element('//*[@id="marginTableTB"]/..//strong');}},
  priceInOrderConfirmationPage: { get: function () { return browser.element('(//td[@class="right"])[2]//span');}},
  quantityInOrderConfirmationPage: { get: function () { return browser.element('(//td[@class="right"])[1]');}},
  totalPrice: { get: function () { return browser.element('//td[@class="right"]//strong');}},
  nextInOrderConfirmation: { get: function () { return browser.element('//img[@id="ctl00_ContentPlaceHolder1_btnsubEnter"]');}},
  purchaseOrder: { get: function () { return browser.element('//a[@id="soNumberCommand"]//span');}},
  departmentId: { get: function () { return browser.element('//input[@id="shipToDepartment"]');}},
  error: { get: function () { return browser.element('//li[@class="iconError"/span]');}},
  
  /**
   * User verifies model number and quantity
   */
  checkQuantityAndModel: {
    value: function(department) {
      this.departmentId.waitForEnabled();
      this.departmentId.setValue("ＱＢＵＲＳＴ");
      this.modelNumber.waitForVisible();
      expect(this.modelNumber.getValue()).to.be.equal(browser.params.modelNumberOrderPage);
      expect(this.orderQuanity.getValue()).to.be.equal(browser.params.quantiyOrderpage);
    }
  },

  /**
   * User clicks the next button
   */
  clickNext: {
    value: function() {
      browser.scrollToElement(this.nextButtonSelector);
      this.nextButton.waitForVisible();
      this.nextButton.click();
      
     
    }
  },

  /**
   * User clicks the close button
   */
  clickcloseButton: {
    value: function() {
      this.closeButton.waitForVisible();
      this.closeButton.click();
    }
  },

  /**
   * User verifies price, quantity, and model number in shiping date page
   */
  verifyDetails: {
    value: function() {
     browser.tinyWait();
     this.modelNumberInShippingdatePage.waitForVisible(); 
     expect(browser.params.modelNumberOrderPage).to.be.equal(this.modelNumberInShippingdatePage.getText());
     expect(this.priceInShippingDatePage.getText()).to.include(browser.params.priceOrderPage);
     expect(browser.params.quantiyOrderpage).to.be.equal(this.quantityInShippingDatePage.getText());
    }
  },

  /**
   * User clicks next button
   */
  clickNextButtonInShippingDatePage: {
    value: function() {
      this.nextButtonShippingDate.waitForEnabled();
      this.nextButtonShippingDate.click();
      if(this.shippingError.isVisible()){
        if(this.selectDateDropDown.isVisible()){
          this.selectDateDropDown.waitForEnabled();
          this.selectDateDropDown.click();
          this.selectDate.waitForVisible();
          this.selectDate.click();
        }
        this.nextButtonShippingDate.waitForEnabled();
        this.nextButtonShippingDate.click();
      }
    }
  },

  /**
   * User verifies price, quantity, and model number in Orderconfirmation page
   */
  verifyDetailsOrderConfirmationPage: {
    value: function() {
     browser.scrollToElement(this.tableSelector);
     this.modelNumberInOrderConfirmationPage.waitForVisible(); 
     expect(browser.params.modelNumberOrderPage).to.be.equal(this.modelNumberInOrderConfirmationPage.getText());
     expect(this.priceInOrderConfirmationPage.getText()).to.include(browser.params.priceOrderPage);
     expect(browser.params.quantiyOrderpage).to.be.equal(this.quantityInOrderConfirmationPage.getText());
     expect(browser.params.priceOrderPage).to.be.equal(this.totalPrice.getText());
    }
  },

  /**
   * User clicks the next button in order confirmation
   */
  clickNextOrderConfirmationPage: {
    value: function() {
      this.nextInOrderConfirmation.waitForEnabled();
      this.nextInOrderConfirmation.click();
    }
  },

   /**
   * User gets the purchase order number
   */
  getPurchaseOrderNumber: {
    value: function() {
      this.purchaseOrder.waitForVisible();
      browser.params.purchaseOrderNumber=this.purchaseOrder.getText();
    
    }
  },

  /**
   * User switches to mypage
   */
  switchToMyPage: {
    value: function() {
     browser.switchTab(browser.windowHandles().value[0]);
     let env = process.env.npm_config_env || 'tst';
     const urlData = browser.filterByUsage(env)[0];
     url = urlData;
     presentUrl=browser.getUrl();
     expect(url.myPageUrl).to.be.equal(presentUrl);
    }
  },
};

module.exports = Object.create(Page, wosPage);