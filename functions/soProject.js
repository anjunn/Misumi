let Page = require('./page');
let expectedData = require('../data/expected-results/common.json');
/**
 * Qt project Page Object
 *
 * @class functions/qtProject
 * @type {Page}
 */
let soProjectPage = {
  /*
   * define elements
   */

  choiceButton:{ get: function () { return browser.element('(//button[@class="btn btn-primary no-tab dropdown-toggle"]/i)[3]');}},
  supplierListOption:{ get: function () { return browser.element('//li[@class="dropup-submenu"]//a[contains(text(), "サプライヤー")]');}},
  toyoeiPrecisiListOption:{ get: function () { return browser.element('(//ul[@class="dropdown-menu"]//a[contains(text() , "豊栄精密(1167)")])[2]');}},
  orderingButton:{ get: function () { return browser.element('(//div[@class="btn no-tab noPadding noBordor dropup"]/a)[1]');}},
  orderingListOption: { get: function () { return browser.element('(//ul[@class="dropdown-menu"]//a[contains(text(), "メール")])[3]');}},
  emailSubjectField: { get: function () { return browser.element('//input[@id="email_subject"]');}},
  textArea:{ get: function () { return browser.element('//textarea[@id="email_comment"]');}},
  sendEmailDialog:{ get: function () { return browser.element('(//div[@class="text-center"]//h3)[3]');}},
  okButton: { get: function () { return browser.element('//i[@id="mailResultOk"]');}},
  operationStatusColumn:{ value: function (n){return browser.element(`//table[@id="detailTable"]/tbody/tr[${n}]/td[7]`);}},
  productPartNumber: { value: function (n){return browser.element(`//table[@id="detailTable"]/tbody/tr[${n}]/td[2]/a`);}},
  projectPage: { get: function() { return browser.element('//div[@class="panel-body"]//figure/img'); } },
  orderButton: { get: function() { return browser.element('//span[contains(text(), "注文へ進む")]'); } },
  partsView: { value: function(n) { return browser.element(`//table/tbody/tr[${n}]/td[2]/a`); } },
  partName: { get: function() { return browser.element('//select[@id="condArticleType"]/option');} },
  orderLink: { get: function() { return browser.element('//a[contains(text(), "注文へ進む")]');} },
  customerNumber:{ get: function () { return browser.element('//div[@class="form-control no-border ellipsis"][@id="detail4"]');}},
  customerName:{ get: function () { return browser.element('//div[@class="form-control no-border ellipsis"][@id="detail5"]');}},

   /**
   * Admin selects the supplier
   */
  selectSupplier: {
    value: function() {
      browser.waitForLoading('//div[@id="loader"]');
      this.choiceButton.moveToObject();
      this.choiceButton.click();
      this.supplierListOption.moveToObject();
      this.toyoeiPrecisiListOption.click();
    }
  },

  /**
   * Admin sends mail to supplier
   */
  sendMailToSupplier: {
    value: function() {
      this.orderingButton.click();
      this.orderingListOption.click();
      browser.smallWait();
      try {
        if (browser.alertText()) {
          browser.alertAccept();
        }
      } catch(e) {
        console.log(e.message);
      }
      browser.smallWait();
      try {
        if (browser.alertText()) {
          browser.alertAccept();
        }
      } catch(e) {
        console.log(e.message);
      }
      browser.mediumWait();
      this.emailSubjectField.waitForVisible();
      var subject = `[QA-TEST] ${this.emailSubjectField.getValue()}`;
      this.emailSubjectField.setValue(subject);
      let mailBody = this.textArea.getValue().replace(/\s/g, '');
      browser.mediumWait();
      expect(mailBody).to.include(this.customerName.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.customerNumber.getText().replace(/\s/g, ''));
      browser.execute(function() {
        var sendButton = document.querySelector('#makeMailSend');
        sendButton.click();
      });
    }
  },

  /**
   * Admin verfies if mail has been sent
   */
  verifySendMail: {
    value: function() {
      this.sendEmailDialog.waitForVisible();
      expect(this.sendEmailDialog.getText()).to.be.equal(expectedData.sendEmailDialog);
      this.okButton.click();
    }
  },

  /*
   * Checks SO operation status
   */
  checkSoOperationStatus: {
    value: function(count) {
      browser.waitForLoading('//div[@id="loader"]');
      for (var i = 1, j = 1; i <= count; i++, j+=2) {
        this.operationStatusColumn(j).moveToObject();
        this.operationStatusColumn(j).waitForVisible();
        var soOperationStatus = this.operationStatusColumn(j).getText();
        expect(soOperationStatus).to.be.equal(expectedData.soOperationStatusData);
      }
    }
  },

   /*
   * Checks product part details for multiple pin
   */
  checkSoProductPartNumber: {
    value: function(expected,count) {
      if (browser.params.modelNumber) {
        for (var j = 0, position = 2; j < count; j++, position+=2) {
          this.productPartNumber(position).moveToObject();
          this.productPartNumber(position).waitForVisible();
          var soProductPartNumber = this.productPartNumber(position).getText();
          var i = j + 1;
          expect(soProductPartNumber).to.equal(browser.params.modelNumber[`part${i}`]);
        }
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
      var windowHandles = browser.windowHandles();
      browser.close(windowHandles.value[windowHandles.value.length - 2]);
      browser.smallWait();
    }
  },

  /*
   * Check parts view of each part
   */
  checkPartsView: {
    value: function(count, parts) {
      for(i = 1, j = 1; j <= 7; i+=2, j++) {
        browser.mediumWait();
        this.projectPage.waitForVisible();
        this.partsView(i).moveToObject();
        this.partsView(i).click();
        browser.mediumWait();
        var windowHandles = browser.windowHandles();
        browser.switchTab(windowHandles.value[windowHandles.value.length - 1]);
        browser.mediumWait();
        if ( j > 2) {
          this.partName.waitForVisible();
          expect(this.partName.getText()).to.equal(parts[`part${j}`]);
          expect(this.orderLink.isVisible()).to.equal(false);
        }
        browser.close(windowHandles.value[windowHandles.value.length - 2]);
      }
    }
  },
};
module.exports = Object.create(Page, soProjectPage);
