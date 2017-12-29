let Page = require('./page');
let expectedData = require('../data/expected-results/common.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json')
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
  sendMailPinAndPlate: { get: function () { return browser.element('(//button[@class="btn btn-default mailButton"])[5]');}},
  sendMail: { get: function () { return browser.element('(//button[@class="btn btn-default mailButton"])');}},
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
  partNameFirstRow:{ get: function () { return browser.element('//table[@id="detailTable"]/tbody/tr[1]/td[14]');}},
  partPriceFirstRow:{ get: function (){ return browser.element('//table[@id="detailTable"]/tbody/tr[2]/td[3]');}},
  operationStatusColumn:{ get: function (){return browser.element('//table[@id="detailTable"]/tbody/tr[1]/td[6]');}},
  productPartNumber: { value: function (n){return browser.element(`//table[@id="detailTable"]/tbody/tr[${n}]/td[13]`);}},

  /*
   * Admin validate price and name of each parts
   */
  validateOrderDetails: {
    value: function(names, pinType) {
      browser.waitForLoading('//div[@id="loader"]');
      if (pinType === 'single pin'){
          this.partNameFirstRow.moveToObject();
          var partName = this.partNameFirstRow.getText();
          expect(partName).to.be.equal(names['part1']);
          var partPrice = this.partPriceFirstRow.getText();
          expect(partPrice).to.be.equal(browser.params.singlePinPrice['part1'] + '円');
      }else if (pinType === 'multiple pin'){
        console.log("In qtProject validateOrderDetails");
        var position = 1;
        for (var i = 1; i <= 7; i++) {
          if (i != 1) position = position + 2;
          browser.moveToObject(`//table[@id="detailTable"]/tbody/tr[${position}]/td[14]`);
          var partName = this.partNames(position).getText();
          expect(partName).to.be.equal(names[`part${i}`])
          if (i != 7) {
            var partPrice = this.partPrice(i*2).getText();
            expect(partPrice).to.be.equal(browser.params.multiplePinPrice['part'+ i ] + '円');
          }
        }
      }else if (pinType === 'pin and plate'){
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
    value: function(pinType, count) {
      browser.pause(5000);
      this.waitforLoadingFile.isVisible();
      if (pinType === 'pin and plate'){
        this.sendMailPinAndPlate.moveToObject();
        this.sendMailPinAndPlate.waitForVisible();
        this.sendMailPinAndPlate.click();
      } else {
        browser.scroll();
        this.sendMail.moveToObject();
        this.sendMail.waitForVisible();
        this.sendMail.click();
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
        this.sendMailPinAndPlate.waitForVisible();
        this.sendMailPinAndPlate.click();
      } else {
        browser.scroll();
        this.sendMail.waitForVisible();
        this.sendMail.click();
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
    }
  },

  /*
   * Checks QT operation status after sending mail to TPro for multiple pin
   */
   checkQtOperationStatus: {
    value: function() {
      var qtOperationStatus = this.operationStatusColumn.getText();
      expect(qtOperationStatus).to.be.equal(expectedData.qtOperationStatusData);
    }
   },

  /*
   * Checks product part number for multiple pin
   */
   checkProductPartNumber: {
    value: function(count) {
      var position = 1;
      for (var i = 1; i <= count; i++) {
        if (i != 1)  position = position + 2;
        var qtProductPartNumber = this.productPartNumber(position).getText();
        console.log("qtProductPartNumber"+qtProductPartNumber);
        // expect(qtProductPartNumber).to.be.equal(multiplePinExpectedData.qtProductPartNumber);
      }
    }
   },

   /*
    * Checks QT Revision for the parts
    */
   checkQtRevision: {
    value: function(pinType) {
      var position = 1;
      for (var i = 1; i <= count; i++) {
        if (i != 1)  position = position + 2;
        var qtProductPartNumber = this.operationStatusColumn.getText();
        console.log(qtProductPartNumber);
        var qtRevision = 
        expect(qtOperationStatus).to.be.equal(multiplePinExpectedData.qtRevision);
    }
   }
 }

};

module.exports = Object.create(Page, qtProjectPage);