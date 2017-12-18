let Page = require('./page');
let expectedData = require('../data/expected_results/common.json');
/**
 * Qt project Page Object
 *
 * @class functions/qtProject
 * @type {Page}
 */
let qtProjectPage = {
  /**
   * define elements
   */
  productName: { value: function (n) {return browser.element(`(//td[contains(@class,"linkColor")][3])[${n}]`); }},
  partNames: { value: function (n) {return browser.element(`//table[@id="detailTable"]/tbody/tr[${n}]/td[14]`); }},
  partPrice: { value: function (n) {return browser.element(`//table[@id="detailTable"]/tbody/tr[${n}]/td[3]`); }},
  sendMail: { get: function () { return browser.element('(//button[@class="btn btn-default mailButton"])[5]');}},
  sendButton:{ get: function () { return browser.element('//a[@class="btn btn-success col-sm-3"]');}},
  textArea:{ get: function () { return browser.element('//textarea[@id="email_comment"]');}},
  sendEmailDialog:{ get: function () { return browser.element('(//div[@class="text-center"]//h3)[3]');}},
  selectToAdress: { get: function () { return browser.element('//select[@id="mailTypeList"]');}},
  waitforLoadingFile: { get: function () { return browser.element('(//img[@class="icon"])[3]');}},
  okButton: { get: function () { return browser.element('//i[@id="mailResultOk"]');}},
  attach2D: { get: function () { return browser.element('(//button[@class="btn btn-default"])[1]');}},
  editQuotationButton: { get: function () { return browser.element('(//button[@class="btn btn-default editButton"])[3]');}},
  collapseButtonInEditQuotation: { get: function () { return browser.element('//a[@id="slideKbnInfoAccordionBtn"]');}},
  emailSubjectField: { get: function () { return browser.element('//input[@id="email_subject"]');}},
  minQuantity: { get: function () { return browser.element('//input[@id="editSlideStartCount0"]');}},
  maxQuantity: { get: function () { return browser.element('//input[@id="editSlideEndCount0"]');}},
  pricePerUnitPrice: { get: function () { return browser.element('//input[@id="editSlideRegPrice0"]');}},
  sellingPrice: { get: function () { return browser.element('//input[@id="editSlidePrice0"]');}},
  purchasePrice: { get: function () { return browser.element('//input[@id="editSlideCost0"]');}},
  deliveryDays: { get: function () { return browser.element('//input[@id="editSlideDeliDay0"]');}},
  suppliersDropdown:{ get: function () { return browser.element('(//button[@class="multiselect dropdown-toggle btn btn-default"])[1]');}},
  supplierTake:{ get: function () { return browser.element('//input[@value="1167"]');}},
  reflect:{ get: function () { return browser.element('//button[@id="slideReflection"]');}},
  editButton:{ get: function () { return browser.element('//button[@id="editFormSend"]');}},
  status:{ get: function () { return browser.element('//select[@id="editStatus"]');}},
  statusChange:{ get: function () { return browser.element('(//option[@value="4"])[1]');}},
  clearButton: { get: function () { return browser.element('(//button[@class="btn btn-default multiselect-clear-filter"])[1]');}},

  /**
   * Admin validate price and name of each parts
   */
  validateOrderDetails: {
    value: function(names) {
      browser.waitForLoading('//div[@id="loader"]');
      var position = 1;
      for (var i = 1; i <= 3; i++) {
        if (i != 1) position = position + 2;
        browser.moveToObject(`//table[@id="detailTable"]/tbody/tr[${position}]/td[14]`);
        var partName = this.partNames(position).getText();
        expect(partName).to.be.equal(names[`part${i}`])
        if (i != 3) {
          var partPrice = this.partPrice(i*2).getText();
          expect(partPrice).to.be.equal(browser.params.pinAndPlatePrice['part'+ i ] + '円');
        }
      }
    }
  },

  /**
   * Admin sends mail to Tpro for 2D data.
   * Subject is changed for filtering.
   */
   sendMailFor2DData: {
    value: function() {
      browser.pause(5000);
      this.waitforLoadingFile.isVisible();
      this.sendMail.moveToObject();
      this.sendMail.waitForVisible();
      this.sendMail.click();
      this.selectToAdress.waitForVisible();
      browser.selectByValue('//select[@id="mailTypeList"]',"8");
      browser.pause(1000);
      var subject = `[QA-TEST] ${this.emailSubjectField.getValue()}`;
      this.emailSubjectField.setValue(subject);
      browser.pause(1000);
      this.textArea.click();
      browser.pause(1000);
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },

  /**
   * Admin verfies if mail has been send
   */
  verifySendMail: {
    value: function() {
      this.sendEmailDialog.waitForVisible();
      expect(this.sendEmailDialog.getText()).to.be.equal(expectedData.sendEmailDialog);
      this.okButton.click();
    }
  },

  /**
   * Admin sends mail to Supplier, by uploading 2D data
   */
  sendMailToSupplier: {
    value: function() {
      browser.pause(2000);
      this.sendMail.waitForVisible();
      this.sendMail.click();
      this.selectToAdress.waitForVisible();
      browser.selectByValue('//select[@id="mailTypeList"]', "10");
      browser.chooseFile("#file_input", "../QA_Automation/Data/2D-Data/TJP17AL8GZ02AA.pdf");
      this.textArea.click();
      browser.pause(1000);
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },

  /**
   * Admin edits quotation, and reveals price and delivery date
   */
  editQuotation: {
    value: function(quotationResult) {
      browser.pause(1000);
      this.editQuotationButton.moveToObject();
      this.editQuotationButton.waitForVisible();
      this.editQuotationButton.click();
      this.status.click();
      this.statusChange.waitForVisible();
      this.statusChange.click();
      this.collapseButtonInEditQuotation.waitForVisible();
      this.collapseButtonInEditQuotation.click();
      this.minQuantity.moveToObject();
      this.minQuantity.waitForVisible();
      this.minQuantity.setValue(quotationResult.minQuantity);
      this.maxQuantity.moveToObject();
      this.maxQuantity.setValue(quotationResult.maxQuantity);
      this.pricePerUnitPrice.moveToObject();
      this.pricePerUnitPrice.setValue(quotationResult.pricePerUnitPrice);
      this.sellingPrice.moveToObject();
      this.sellingPrice.setValue(quotationResult.sellingPrice);
      this.purchasePrice.moveToObject();
      this.purchasePrice.setValue(quotationResult.purchasePrice);
      this.deliveryDays.moveToObject();
      this.deliveryDays.setValue(quotationResult.deliveryDays);
      this.suppliersDropdown.moveToObject();
      this.suppliersDropdown.click();
      this.supplierTake.waitForVisible();
      this.supplierTake.moveToObject();
      this.supplierTake.click();
      if (this.clearButton.isVisible()) this.suppliersDropdown.click();
      this.reflect.moveToObject();
      this.reflect.waitForVisible();
      this.reflect.click();
      this.editButton.moveToObject();
      this.editButton.click();
    }
  },
};

module.exports = Object.create(Page, qtProjectPage);