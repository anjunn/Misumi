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
      browser.pause(1000);
      try {
        if (browser.alertText()) {
          browser.alertAccept();
        }
      } catch(e) {
        console.log(e.message);
      }
      browser.pause(1000);
      try {
        if (browser.alertText()) {
          browser.alertAccept();
        }
      } catch(e) {
        console.log(e.message);
      }
      browser.pause(2000);
      this.emailSubjectField.waitForVisible();
      var subject = `[QA-TEST] ${this.emailSubjectField.getValue()}`;
      this.emailSubjectField.setValue(subject);
      this.textArea.click();
      // expect(this.textArea.getValue()).to.include('pin-and-plate1513748027550.x_t');
      // //browser.params.fileName
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
 
 sendMailToSupplier: {
    value: function() {
      this.orderingButton.click();
      this.orderingListOption.click();
      browser.pause(1000);
      try {
        if (browser.alertText()) {
          browser.alertAccept();
        }
      } catch(e) {
        console.log(e.message);
      }
      browser.pause(1000);
      try {
        if (browser.alertText()) {
          browser.alertAccept();
        }
      } catch(e) {
        console.log(e.message);
      }
      browser.pause(2000);
      this.emailSubjectField.waitForVisible();
      var subject = `[QA-TEST] ${this.emailSubjectField.getValue()}`;
      this.emailSubjectField.setValue(subject);
      this.textArea.click();
      let mailBody = this.textArea.getValue().replace(/\s/g, '');
      expect(mailBody).to.include(this.customerName.getText().replace(/\s/g, ''));
      expect(mailBody).to.include(this.customerNumber.getText().replace(/\s/g, ''));
      browser.keys('\uE004');
      browser.keys('\uE007');
    }
  },


  };
  module.exports = Object.create(Page, soProjectPage);