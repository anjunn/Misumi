let Page = require('./page');
let inputData = require('../data/input-data/dataset.json');
let expectDataSinglePin = require('../data/expected-results/single-pin.json');
let mailExpectedData = require('../data/expected-results/email.json');

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
  mailIcon: { get: function () { return browser.element('//a[@id="O365_AppTile_Mail"]/.');} },
  submitButton: { get: function () { return browser.element('//input[@type="submit"]');} },
  openMail: { get: function () { return browser.element('//div[@autoid="_lvv_9"]');} },
  mailEstimateFolder: { get: function () { return browser.element('//div[@id="MailFolderPane.FavoritesFolders"]//span[@title="見積り"]');} },
  mailOrderFolder: { get: function () { return browser.element('//div[@id="MailFolderPane.FavoritesFolders"]//span[@title="注文"]');} },
  fileNameInMail: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]`);} },
  mailCheckbox: { value: function (name) { return browser.element(`//span[contains(text(),("${name}"))]/../..//button[@role="checkbox"]`);} },
  maildeleteIcon: { get: function () { return browser.element('//button[@title="削除 (Del)"]');} },
  mailBody: { get: function () { return browser.element('//div[@class="PlainText"]');} },
  mailLink: { get: function () { return browser.element('//div[@class="PlainText"]/a');} },
  mailPreview: { get: function () { return browser.element('//div[@class="PlainText"]');} },
  staySignedInNobutton: { get: function () { return browser.element('//input[@id="idBtn_Back"]');} },

  /*
   * Goes to email account home
   */
  goToEmail: {
    value: function () {
      let env = process.env.npm_config_env || 'tst';
      const urlData = browser.filterByUsage(env)[0];
      url = urlData;
      browser.url(url.mailUrl);
    }
  },

  /*
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
      browser.longWait();
      if (this.passwordField.isVisible()) {
        this.passwordField.setValue(inputData.loginCredentials.mail.password);
        this.submitButton.click();
      }
    }
  },

  /*
   * Navigates to mail section.
   */
  selectMail: {
    value: function(type) {
      browser.smallWait();
      if(this.staySignedInNobutton.isVisible()){
        this.staySignedInNobutton.click();
      }
      this.menuIcon.waitForVisible();
      browser.mediumWait();
      this.menuIcon.click();
      browser.mediumWait();
      this.mailIcon.waitForVisible();
      this.mailIcon.click();
      browser.longWait();
      browser.refresh();
      if ( type === 'estimate' || type  === 'quotation' ) {
        this.mailEstimateFolder.waitForVisible();
        this.mailEstimateFolder.click();
      } else if ( type === 'order' ) {
        this.mailOrderFolder.waitForVisible();
        this.mailOrderFolder.click();
      }
      browser.longWait();
      let fileName = browser.params.fileName;
      this.fileNameInMail(fileName).waitForExist();
      this.fileNameInMail(fileName).click();
      this.mailPreview.waitForVisible();
      projectPageUrlFromMail = this.mailLink.getText();
    }
  },

  /*
   * Verify price, name and link in mail
   * After validation, delete the mail for avoiding future error
   */
  validateEstimationMail: {
    value: function() {
      let initialPrice = browser.params.initialPrice;
      projectPageUrl = browser.params.projectPageUrl;
      if (browser.params.initialPrice) expect(this.mailPreview.getText()).to.include(browser.params.initialPrice);
      let content = this.mailBody.getText().replace(/\s/g, '');
      expect(content).to.include(browser.params.modelNumber.part1);
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(projectPageUrlFromMail).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
      expect(projectPageUrlFromMail).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
    }
  },


  /*
   * Verify price, name, link nd material in mail
   * After validation, delete the mail for avoiding future error
   */
  validateQuotationMail: {
    value: function() {
      projectPageUrl = browser.params.projectPageUrl;
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(this.mailPreview.getText()).to.include(mailExpectedData.quotationMail.material);
      expect(this.mailPreview.getText()).to.include(mailExpectedData.quotationMail.price);
      expect(this.mailPreview.getText()).to.include(mailExpectedData.quotationMail.delivery);
      expect(projectPageUrlFromMail).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
      expect(projectPageUrlFromMail).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
    }
  },
  /*
   * Verify price and name in mail
   */
  validateOrderMail: {
    value: function() {
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(this.mailPreview.getText()).to.include(browser.params.totalPrice);
    }
  },

  /**
   * Verify mail body content
   */
  checkMailContent: {
    value: function() {
      let fileName = browser.params.fileName;
      let initialPrice = browser.params.initialPrice;
      projectPageUrl = browser.params.projectPageUrl;
      browser.mediumWait();
      let content=this.mailBody.getText().replace(/\s/g, '');
      let projectName = (expectDataSinglePin.mailContents.part1+browser.params.fileName);
      let fileNameMail =(expectDataSinglePin.mailContents.part2+browser.params.fileName);
      expect(content).to.include(browser.params.fileName);
      expect(content).to.include(projectName);
      expect(content).to.include(fileNameMail);
      expect(content).to.include(browser.params.modelNumber);
      if (browser.params.initialPrice) expect(this.mailPreview.getText()).to.include(browser.params.initialPrice);
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
      projectPageUrlFromMail = this.mailLink.getText();
      this.maildeleteIcon.click();
      browser.url(projectPageUrlFromMail);
    }
  },

  /**
   * User goes back to product page
   */
  goToProductPage: {
    value: function() {
      browser.url(projectPageUrlFromMail);
    }
  }
};

module.exports = Object.create(Page, emailPage);