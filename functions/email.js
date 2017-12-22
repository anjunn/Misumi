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
  passwordField: { get: function () { return browser.element('//input[@type="password"]');} },
  menuIcon: { get: function () { return browser.element('//button[@id="O365_MainLink_NavMenu"]');} },
  mailIcon: { get: function () { return browser.element('//img[@aria-label="Go to your email"]/..');} },
  submitButton: { get: function () { return browser.element('//input[@type="submit"]');} },
  estimateFav: { get: function () { return browser.element('//*[@id="primaryContainer"]/div[5]/div/div[1]/div/div[1]/div[2]/div/div[1]/div[2]/button/span[1]');} },
  openMail: { get: function () { return browser.element('//div[@autoid="_lvv_9"]');} },
  mailEstimateFolder: { get: function () { return browser.element('//div[@id="MailFolderPane.FavoritesFolders"]//span[@title="見積り"]');} },
  fileNameInMail: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]`);} },
  mailCheckbox: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]/../..//button[@role="checkbox"]`);} },
  maildeleteIcon: { get: function () { return browser.element('//button[@title="削除 (Del)"]');} },
  mailLink: { get: function () { return browser.element('//*[@id="Item.MessageNormalizedBody"]/div/div/div/font/span/div/a');} },
  mailPreview: { get: function () { return browser.element('//*[@id="Item.MessageNormalizedBody"]/div/div/div/font/span/div');} },

  /*
   * Goes to email account home
   */
  goToEmail: {
    value: function () {
      browser.url(inputData.url.mailUrl);
    }
  },

  /**
   * Logs into email
   */
  loginToEmail: {
    value: function() {
      this.emailField.setValue(inputData.loginCredentials.mail.username);
      this.submitButton.click();
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
      browser.refresh();
      this.mailEstimateFolder.waitForVisible();
      this.mailEstimateFolder.click();
      browser.pause(3000);
    }
  },

  /**
   * Verify price, name and link in mail
   */
  validateMail: {
    value: function() {
      let fileName = browser.params.fileName;
      let initialPrice = browser.params.initialPrice;
      projectPageUrl = browser.params.projectPageUrl;

      if (this.fileNameInMail(fileName).isVisible()) {
        this.fileNameInMail(fileName).click();
        this.mailCheckbox(fileName).click();
        this.mailPreview.waitForVisible();
        browser.pause(2000);
        if (browser.params.initialPrice) expect(this.mailPreview.getText()).to.include(browser.params.initialPrice);
        expect(this.mailPreview.getText()).to.include(browser.params.fileName);
        expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
        expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
        projectPageUrlFromMail = this.mailLink.getText();
        this.maildeleteIcon.click(); // After validation, delete the mail for avoiding future error.
      }
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