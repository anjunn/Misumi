let Page = require('./page');
let data=require('../Data/dataset.js');
let singlePinData=require('../Data/SinglePin.js');
var order;

let singlePin = {

  quantity: {get: function () { return browser.element('//*[@class="customInput"]//input[@type="number"]');}},
  material: {get: function () { return browser.element('//*[@name="materialId"]');}},
  surfaceTreatment: {get: function () { return browser.element('//*[@name="surfaceId"]');}},
  tolerance:{get: function () { return browser.element('//*[@name="toleranceClassId"]');}},
  getEstimate:{get: function () { return browser.element('//*[contains(text(),"見積りに進む")]');}},
  thumbnail: { get : function() { return browser.element('//*[@class="dataBox"]//..//*[@class="figureBox"]//img'); } },

  quantityChange: {get: function () { return browser.element('//*[@id="0"]');}},
  checkBox: {get: function () { return browser.element('//*[@id="main"]/div[2]/div/div[1]/div/label/span');}},
  placeOrder: {get: function () { return browser.element('//*[contains(text(),"注文を確定する")]');}},
  logoutUser: {get: function () { return browser.element('//*[@id="nav"]//ul//li[2]//a//span');}},
  logout: {get: function () { return browser.element('//*[@id="logoutButton"]');}},
  frame: {get: function () { return browser.element('//*[@class="boxCheckbox"]');}},
  cart: {get: function () { return browser.element('//*[@id="boxAmount"]//..//*[@onclick="checkOrderCondition();"]');}},

  customerNumber: {get: function () { return browser.element('//*[@class="customInput oya"]//input');}},
  thankYouHeading: {get: function () { return browser.element('//*[@id="main"]/div/h1');}},
  goToHistory: {get: function () { return browser.element('//*[contains(text(),"この注文の履歴詳細へ")]');}},
  orderNo: {get: function () { return browser.element('//*[@id="main"]/div/div[1]/div[3]/strong');}},
  verifyOrderNo: {get: function () { return browser.element('//*[@id="main"]/div/div/div/div[1]/div/p[2]/span');}},
  
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
      
      
    }
  },
  openProject: {
    value: function() {
      this.thumbnail.waitForVisible();
      this.thumbnail.click();
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
      this.orderNo.waitForEnabled();
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