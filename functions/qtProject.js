let Page = require('./page');
let expectedData = require('../data/expected-results/common.json');
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
  sendMail: { value: function (n) { return browser.element(`(//button[@class="btn btn-default mailButton"])[${n}]`);}},
  sendMailPlate: { get: function () { return browser.element('//button[@class="btn btn-default mailButton"]');}},
  sendButton:{ get: function () { return browser.element('//a[@class="btn btn-success col-sm-3"]');}},
  textArea:{ get: function () { return browser.element('//textarea[@id="email_comment"]');}},
  sendEmailDialog:{ get: function () { return browser.element('(//div[@class="text-center"]//h3)[3]');}},
  selectToAdress: { get: function () { return browser.element('//select[@id="mailTypeList"]');}},
  waitforLoadingFile: { get: function () { return browser.element('(//img[@class="icon"])[3]');}},
  okButton: { get: function () { return browser.element('//i[@id="mailResultOk"]');}},
  attach2D: { get: function () { return browser.element('(//button[@class="btn btn-default"])[1]');}},
  editQuotationButton: { get: function () { return browser.element('(//button[@class="btn btn-default editButton"])[3]');}},
  editQuotationButtonPlate: { get: function () { return browser.element('(//button[@class="btn btn-default editButton"])');}},
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
  clearButton:{ get: function () { return browser.element('(//button[@class="btn btn-default multiselect-clear-filter"])[1]');}},
  itemNamePlate:{ get: function () { return browser.element('//table[@id="detailTable"]/tbody/tr[1]/td[14]');}},
  customerNumber:{ get: function () { return browser.element('//div[@class="form-control no-border"][@id="detail3"]');}},
  customerName:{ get: function () { return browser.element('//div[@class="form-control no-border"][@id="detail4"]');}},
  itemName:{ get: function () { return browser.element('//table[@class="table table-hover tablesorter tablesorter-blue"]//td[14]');}},
  material:{ get: function () { return browser.element('//table[@class="table table-hover tablesorter tablesorter-blue"]//td[15]');}},
  quantity:{ get: function () { return browser.element('//table[@class="table table-hover tablesorter tablesorter-blue"]//td[17]');}},
  


  /**
   * Admin validate price and name of each parts
   */
  validateOrderDetails: {
    value: function(names, pinType) {
      browser.waitForLoading('//div[@id="loader"]');
      if (pinType === 'pin and plate'){
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
      } else {
         this.itemNamePlate.moveToObject();
         var partName = this.itemNamePlate.getText();
         expect(partName).to.be.equal(names['part1']);
      }
    }
  },

  /**
   * Admin sends mail to Tpro for 2D data.
   * Subject is changed for filtering.
   */
   sendMailFor2DData: {
    value: function(pinType) {
      browser.pause(5000);
      this.waitforLoadingFile.isVisible();
      if (pinType === 'pin and plate'){
        this.sendMail.moveToObject();
        this.sendMail.waitForVisible();
        this.sendMail.click();
      } else {
        this.sendMailPlate.moveToObject();
        this.sendMailPlate.waitForVisible();
        this.sendMailPlate.click();
      }
      this.selectToAdress.waitForVisible();
      browser.selectByValue('//select[@id="mailTypeList"]',"8");
      browser.pause(1000);
      var subject = `[QA-TEST] ${this.emailSubjectField.getValue()}`;
      this.emailSubjectField.setValue(subject);
      browser.pause(1000);
      this.textArea.click();
      expect(this.textArea.getValue()).to.include(browser.params.fileName);
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
    value: function(pinType) {
      browser.pause(2000);
      if (pinType === 'pin and plate') {
        this.sendMail.waitForVisible();
        this.sendMail.click();
      } else {
        this.sendMailPlate.waitForVisible();
        this.sendMailPlate.click();
      }
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
    value: function(quotationResult, pinType) {
      browser.pause(1000);
      if (pinType === 'pin and plate') {
        this.editQuotationButton.moveToObject();
        this.editQuotationButton.waitForVisible();
        this.editQuotationButton.click();
      } else {
        this.editQuotationButtonPlate.moveToObject();
        this.editQuotationButtonPlate.waitForVisible();
        this.editQuotationButtonPlate.click();
      }
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
      browser.pause(1000);
      try {
        if (browser.alertText()) {
          browser.alertAccept();
          browser.pause(1000);
          browser.refresh();
        }
      } catch(e) {
        console.log(e.message);
      }
    }
  },

  sendMailToCustomer: {
    value: function(type) {
      var n = type == 'plate' ? 1 : 5;
      console.log(n);
      browser.waitForLoading('//div[@id="loader"]');
      this.sendMail(n).moveToObject();
      browser.pause(1000);
      this.sendMail(n).click();
      this.selectToAdress.waitForVisible();
      browser.selectByVisibleText('//select[@id="mailTypeList"]', "見積完了");
      this.textArea.click();
      browser.pause(1000);
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },



  verifySendMailForOrdering: {
    value: function(type) {
      var n = type == 'plate' ? 1 : 5;
      browser.waitForLoading('//div[@id="loader"]');
      this.sendMail(n).moveToObject();
      browser.pause(1000);
      this.sendMail(n).click();
      this.selectToAdress.waitForVisible();
      browser.selectByVisibleText('//select[@id="mailTypeList"]', "発注");
      this.textArea.click();
      browser.pause(4000);
      let mailBody = this.textArea.getValue().replace(/\s/g, '');
      expect(mailBody).to.include(this.customerName.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.customerNumber.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.itemName.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.material.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.quantity.getText().replace(/\s/g, ''));
      browser.keys('\uE004');
      browser.keys('\uE004');
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },
};

module.exports = Object.create(Page, qtProjectPage);