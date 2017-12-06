let Page = require('./page');
let data=require('../Data/dataset.js');
let singlePinData=require('../Data/SinglePin.js');

let singlePin = {

  quantity: {get: function () { return browser.element('//*[@class="customInput"]//input[@type="number"]');}},
  material: {get: function () { return browser.element('//*[@name="materialId"]');}},
  surfaceTreatment: {get: function () { return browser.element('//*[@name="surfaceId"]');}},
  tolerance:{get: function () { return browser.element('//*[@name="toleranceClassId"]');}},
  getEstimate:{get: function () { return browser.element('//*[contains(text(),"見積りに進む")]');}},
  thumbnail: { get : function() { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//figure//img'); } },

  quotationConditionFill: {
    value: function(loginDetails) {
      this.quantity.waitForEnabled();
      this.quantity.setValue(singlePinData.quotationCondition.quantity);
      this.material.selectByVisibleText(singlePinData.quotationCondition.material);
      this.surfaceTreatment.selectByVisibleText(singlePinData.quotationCondition.surfaceTreatment);
      this.tolerance.selectByVisibleText(singlePinData.quotationCondition.ToleranceGrade);
      this.getEstimate.click();
      
    }
  },
  checkThumbNail: {
    value: function(loginDetails) {
      this.thumbnail.waitForVisible();
      
    }
  },

};

module.exports = Object.create(Page,singlePin);