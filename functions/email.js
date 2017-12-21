let Page = require('./page');
let inputData = require('../data/input-data/dataset.json');
let projectPageUrlFromMail;

/**
 * email Page Object
 *
 * @class functions/email
 * @type {Page}
 */
let emailPage = {
  /**
   * define elements
   */
  emailField: { get: function () { return browser.element('//input[@type="email"]');} },
  emailButton: {  get: function () { return browser.element('(//div[@class="table-row"]/div[@class="table-cell text-left content"])[1]');} },
  passwordField: { get: function () { return browser.element('//input[@type="password"]');} },
  menuIcon: { get: function () { return browser.element('//button[@id="O365_MainLink_NavMenu"]');} },
  mailIcon: { get: function () { return browser.element('//img[@aria-label="Go to your email"]/..');} },
  submitButton: { get: function () { return browser.element('//input[@type="submit"]');} },
  openMail: { get: function () { return browser.element('//div[@autoid="_lvv_9"]');} },
  mailEstimateFolder: { get: function () { return browser.element('//div[@id="MailFolderPane.FavoritesFolders"]//span[@title="見積り"]');} },
  fileNameInMail: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]`);} },
  mailCheckbox: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]/../..//button[@role="checkbox"]`);} },
  mailPreview: { get: function () { return browser.element('//div[@class="conductorContent"]//div[@class="PlainText"]');} },
  mailLink: { get: function () { return browser.element('//div[@class="conductorContent"]//div[@class="PlainText"]/a');} },
  maildeleteIcon: { get: function () { return browser.element('//button[@title="削除 (Del)"]');} },

  /*
   * Goes to email account home
   */
  goToEmail: {
    value: function () {
      browser.url('https://login.microsoftonline.com/');
    }
  },

  /**
   * Logs into email
   */
  loginToEmail: {
    value: function() {
      if (this.emailField.isVisible()) {
        this.emailField.setValue(inputData.loginCredentials.mail.username);
        this.submitButton.click();
      } else if (this.emailButton.isVisible()) {
        this.emailButton.click();
      }
      this.passwordField.waitForVisible();
      this.passwordField.setValue(inputData.loginCredentials.mail.password);
      this.submitButton.click();
    }
  },

  /**
   * Navigates to mail section.
   */
  selectMail: {
    value: function() {
      this.menuIcon.waitForVisible();
      browser.pause(2000);
      this.menuIcon.click();
      browser.pause(2000);
      this.mailIcon.waitForVisible();
      this.mailIcon.click();
      browser.pause(3000);
      browser.refresh();
    }
  },

  /**
   * Verify price, name and link in mail
   */
  validateMail: {
    value: function() {
      this.mailEstimateFolder.waitForVisible();
      this.mailEstimateFolder.click();
      browser.pause(3000);
      let fileName = browser.params.fileName;
      let initialPrice = browser.params.initialPrice;
      projectPageUrl = browser.params.projectPageUrl;
      this.fileNameInMail(fileName).waitForVisible();
      browser.pause(2000);
      browser.click(this.fileNameInMail(fileName));
      this.mailCheckbox(fileName).waitForVisible();
      browser.pause(2000);
      this.mailCheckbox(fileName).click();
      this.mailPreview.waitForVisible();
      browser.pause(2000);
      if (browser.params.initialPrice) expect(this.mailPreview.getText()).to.include(browser.params.initialPrice);
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
      projectPageUrlFromMail = this.mailLink.getText();
      // this.maildeleteIcon.click(); // After validation, delete the mail for avoiding future error.
    }
  },

  /**
   * User goes back to product page
   */
  goToProductPage: {
    value: function() {
      browser.url(projectPageUrlFromMail)
    }
  }
}

module.exports = Object.create(Page, emailPage);