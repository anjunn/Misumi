let Page = require('./page');

let emailPage = {

  emailField: { get: function () { return browser.element('//input[@type="email"]');} },
  passwordField: { get: function () { return browser.element('//input[@type="password"]');} },
  menuIcon: { get: function () { return browser.element('//button[@id="O365_MainLink_NavMenu"]');} },
  mailIcon: { get: function () { return browser.element('//img[@aria-label="Go to your email"]/..');} },
  submit: { get: function () { return browser.element('//input[@type="submit"]');} },
  estimateFav: { get: function () { return browser.element('//*[@id="primaryContainer"]/div[5]/div/div[1]/div/div[1]/div[2]/div/div[1]/div[2]/button/span[1]');} },
  openMail: { get: function () { return browser.element('//div[@autoid="_lvv_9"]');} },
  mailEstimateFolder: { get: function () { return browser.element('//*[@id="_ariaId_45.folder"]');} },
  fileNameInMail: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]`);} },
  mailCheckbox: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]/../..//button[@role="checkbox"]`);} },
  maildeleteIcon: { get: function () { return browser.element('//button[@title="削除 (Del)"]');} },
  mailLink: { get: function () { return browser.element('//*[@id="Item.MessageNormalizedBody"]/div/div/div/font/span/div/a');} },
  mailPreview: { get: function () { return browser.element('//*[@id="Item.MessageNormalizedBody"]/div/div/div/font/span/div');} },

  // Login into account.
  login: {
    value: function() {
      this.emailField.setValue('test.t8zb.meviy@misumi.co.jp');
      this.submit.click();
      this.passwordField.waitForVisible();
      this.passwordField.setValue('Puvo5108');
      this.submit.click();
    }
  },

  // Navigate to mail section.
  selectMail: {
    value: function() {
      this.menuIcon.waitForVisible();
      browser.pause(2000);
      this.menuIcon.click();
      browser.pause(2000);
      this.mailIcon.waitForVisible();
      this.mailIcon.click();
      browser.refresh();
      this.mailEstimateFolder.waitForVisible();
      this.mailEstimateFolder.click();
      browser.pause(3000);
    }
  },

  // Find the mail with uploaded file name in the mail subject.
  validateMail: {
    value: function(price) {
      if (this.fileNameInMail(browser.params.fileName).isVisible()) {
        this.fileNameInMail(browser.params.fileName).click();
        this.mailCheckbox((browser.params.fileName)).click();
        this.mailPreview.waitForVisible();

        // Check for stored price, file name and link with the values in mail.

        expect(this.mailPreview.getText()).to.include(price);
        expect(this.mailPreview.getText()).to.include(browser.params.fileName);
        expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
        expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);

        // After confirmation, delete the mail for avoiding future error.

        this.maildeleteIcon.click();
      }
    }
  }
}

module.exports = Object.create(Page, emailPage);