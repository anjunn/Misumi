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
  mailIcon: { get: function () { return browser.element('//img[@aria-label="Go to your email"]/..');} },
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
  
  /*
   * Goes to email account home
   */
  goToEmail: {
    value: function () {
      browser.url(inputData.url.mailUrl);
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
      browser.pause(3000);
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
      this.menuIcon.waitForVisible();
      browser.pause(2000);
      this.menuIcon.click();
      browser.pause(2000);
      this.mailIcon.waitForVisible();
      this.mailIcon.click();
      browser.pause(3000);
      browser.refresh();
      if ( type === 'estimate' || type  === 'quotation' ) {
        this.mailEstimateFolder.waitForVisible();
        this.mailEstimateFolder.click();
      } else if ( type === 'order' ) {
        this.mailOrderFolder.waitForVisible();
        this.mailOrderFolder.click();
      }
      browser.pause(3000);
      let fileName = browser.params.fileName;
      this.fileNameInMail(fileName).waitForVisible()
      this.fileNameInMail(fileName).click();
      this.mailCheckbox(fileName).waitForVisible();
      this.mailCheckbox(fileName).click();
      this.mailPreview.waitForVisible();
      browser.pause(2000);
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
      let content=this.mailBody.getText().replace(/\s/g, '');
      expect(content).to.include(browser.params.modelNumber.part1);
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
      projectPageUrlFromMail = this.mailLink.getText();
      this.maildeleteIcon.click();
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
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/^[^?]*/)[0]);
      expect(this.mailLink.getText()).to.include(browser.params.projectPageUrl.match(/qtId=([^&]*)/)[0]);
      projectPageUrlFromMail = this.mailLink.getText();
      this.maildeleteIcon.click();
    }
  },
  /*
   * Verify price and name in mail
   */
  validateOrderMail: {
    value: function() {
      expect(this.mailPreview.getText()).to.include(browser.params.fileName);
      expect(this.mailPreview.getText()).to.include(browser.params.totalPrice);
      this.maildeleteIcon.click();
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
      browser.pause(2000);
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
      this.maildeleteIcon.click(); // After validation, delete the mail for avoiding future error.
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