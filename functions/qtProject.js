let Page = require('./page');
let expectedData = require('../data/expected-results/common.json');
let multiplePinExpectedData = require('../data/expected-results/multiple-pin.json');
let inputData= require('../data/input-data/dataset.json');

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
  productPartNumber: { value: function (n){return browser.element(`//table[@id="detailTable"]/tbody/tr[${n}]/td[1]/a`);}},
  projectPage: { get: function() { return browser.element('//div[@class="panel-body"]//figure/img'); } },
  orderButton: { get: function() { return browser.element('//span[contains(text(), "注文へ進む")]'); } },
  partsView: { value: function(n) { return browser.element(`//table/tbody/tr[${n}]/td[2]/a`); } },
  partName: { get: function() { return browser.element('//select[@id="condArticleType"]/option');} },
  orderLink: { get: function() { return browser.element('//a[contains(text(), "注文へ進む")]');} },
  customerNumber:{ get: function () { return browser.element('//div[@class="form-control no-border"][@id="detail3"]');}},
  customerName:{ get: function () { return browser.element('//div[@class="form-control no-border"][@id="detail4"]');}},
  itemName:{ get: function () { return browser.element('//table[@class="table table-hover tablesorter tablesorter-blue"]//td[14]');}},
  material:{ get: function () { return browser.element('//table[@class="table table-hover tablesorter tablesorter-blue"]//td[15]');}},
  quantity:{ get: function () { return browser.element('//table[@class="table table-hover tablesorter tablesorter-blue"]//td[17]');}},
 
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
      } else if (pinType === 'multiple pin'){
        var position = 1;
        for (var i = 1; i <= 7; i++) {
          if (i != 1) position = position + 2;
          this.partNames(position).moveToObject();
          var partName = this.partNames(position).getText();
          expect(partName).to.be.equal(names[`part${i}`])
          if (i != 7) {
            var partPrice = this.partPrice(i*2).getText();
            expect(partPrice).to.be.equal(browser.params.multiplePinPrice['part'+ i ] + '円');
          }
        }
      } else if (pinType === 'pin and plate'){
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
      } else if (pinType === 'plate'){
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
        this.sendMail(5).moveToObject();
        this.sendMail(5).waitForVisible();
        this.sendMail(5).click();
      } else {
        browser.scroll();
        this.sendMail(1).moveToObject();
        this.sendMail(1).waitForVisible();
        this.sendMail(1).click();
      }
      this.selectToAdress.waitForVisible();
      this.selectToAdress.selectByValue("8");
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
        this.sendMail(5).waitForVisible();
        this.sendMail(5).click();
      } else {
        browser.scroll();
        this.sendMail(1).waitForVisible();
        this.sendMail(1).click();
      }
      this.selectToAdress.waitForVisible();
      this.selectToAdress.selectByValue("10");
      browser.chooseFile("#file_input", inputData.uploadPath.tproDrawing);
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
    /**
   * Admin sends mail to Customer
   */

  sendMailToCustomer: {
    value: function(type) {
      var n = type == 'plate' ? 1 : 5;
      browser.waitForLoading('//div[@id="loader"]');
      this.sendMail(n).moveToObject();
      browser.pause(1000);
      this.sendMail(n).click();
      this.selectToAdress.waitForVisible();
      this.selectToAdress.selectByVisibleText(inputData.mailList.quotationComplete);
      this.textArea.click();
      browser.pause(1000);
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },

  /*
   * Checks QT operation status after sending mail to TPro for multiple pin
   */
   checkQtOperationStatus: {
    value: function() {
       browser.waitForLoading('//div[@id="loader"]');
     this.operationStatusColumn.moveToObject();
     this.operationStatusColumn.waitForVisible();
     var qtOperationStatus = this.operationStatusColumn.getText();
     expect(qtOperationStatus).to.be.equal(expectedData.qtOperationStatusData);
    }
   },

  /*
   * Checks product part number for multiple pin
   */
   checkQtProductPartNumber: {
    value: function(expected,count) {
      for (var j = 0, position = 2, i = j + 1; j < count; j++, i++, position+=2) {
        this.productPartNumber(position).moveToObject();
        this.productPartNumber(position).waitForVisible();
        var qtProductPartNumber = this.productPartNumber(position).getText();
        expect(qtProductPartNumber).to.equal(browser.params.modelNumber[`part${i}`]);
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
        var qtProductPartNumber = this.operationStatusColumn(position).getText();
        var qtRevision = qtProductPartNumber.slice(qtProductPartNumber.length-2, qtProductPartNumber.length);
        expect(qtOperationStatus).to.be.equal(multiplePinExpectedData.qtRevision);
      }
    }
  },

  /*
   * Checks 3d page of project
   */
  checkProjectPage: {
    value: function() {
      browser.waitForLoading('//div[@id="loader"]');
      browser.params.qtProjectId = browser.windowHandle();
      this.projectPage.moveToObject();
      this.projectPage.waitForVisible();
      this.projectPage.click();
      var windowHandles = browser.windowHandles();
      browser.switchTab(windowHandles.value[windowHandles.value.length - 1]);
    }
  },

  /*
   * Verifies order button is disabled
   */
  checkOrderButton: {
    value: function() {
      this.orderButton.waitForVisible();
      var buttonClass = this.orderButton.getAttribute('class');
      expect(buttonClass).to.be.equal('disable');
      browser.close(browser.windowHandles().value[1]);
      browser.pause(1000);
    }
  },

  /*
   * Check parts view of each part
   */
  checkPartsView: {
    value: function(count, parts) {
      for(i = 1, j = 1; j <= 7; i+=2, j++) {
        browser.pause(2000);
        this.projectPage.moveToObject();
        this.projectPage.waitForVisible();
        this.partsView(i).moveToObject();
        this.partsView(i).click();
        browser.pause(2000);
        browser.switchTab(browser.windowHandles().value[2]);
        browser.pause(2000);
        if ( j > 2) {
          this.partName.waitForVisible();
          expect(this.partName.getText()).to.equal(parts[`part${j}`]);
          expect(this.orderLink.isVisible()).to.equal(false);
        }
        browser.close(browser.windowHandles().value[1]);
      }
    }
  },

  /**
   * Operator verifies 2d Drawing mail with respect to management page
   */
  tproMailVerification: {
    value: function(type) {
      var n = type == 'plate' ? 1 : 5;
      browser.waitForLoading('//div[@id="loader"]');
      this.sendMail(n).moveToObject();
      browser.pause(1000);
      this.sendMail(n).click();
      this.selectToAdress.waitForVisible();
      this.selectToAdress.selectByVisibleText(inputData.mailList.drawingCreationRequestTpro);
      var subject = `[QA-TEST] ${this.emailSubjectField.getValue()}`;
      this.emailSubjectField.setValue(subject);
      this.textArea.click();
      browser.pause(4000);
      let mailBody = this.textArea.getValue().replace(/\s/g, '');
      expect(mailBody).to.include(this.customerName.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.customerNumber.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.itemName.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.material.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.quantity.getText().replace(/\s/g, ''));
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },
};

module.exports = Object.create(Page, qtProjectPage);