let Page = require('./page');
let data = require('../data/input-data/dataset.json');
expectedData = require('../data/expected-results/common.json');
/**
 * Login Page Object
 *
 * @class functions/management/LoginPage
 * @type {Page}
 */
let qtProjectListPage = {
  /**
   * define elements
   */
  productName: { value: function (n) {return browser.element(`(//td[contains(@class,"linkColor")][3])[${n}]`);}},
  product: { get: function () { return browser.element('//table[@id="detailTable"]/tbody//td[9]/a');}},
  productSelector: { get: function() { return 'table#detailTable  td:nth-child(9) > a'; } },
  checkboxSelectFile: { get: function () { return browser.element('(//input[@type="checkbox"])[9]');}},
  findProjectName: { get: function () { return browser.element('//input[@id="findProjectName"]');}},
  searchButton: { get: function () { return browser.element('(//button[@type="submit"])[1]');}},
  personInChargeDropdown: { get: function () { return browser.element('(//button[@class="btn btn-primary no-tab dropdown-toggle"])[2]');}},
  personInChargeList: { get: function () { return browser.element('//ul[@id="responsiblePerson"]//a[contains(text(),"CCT村澤")]');}},
  checkSelectedPerson: { get: function () { return browser.element('(//td[contains(@class, "ellipsis")])[5]');}},
  selectedPersonSelector: { get: function() { return 'table#detailTable  td:nth-child(13)'; } },
  status: { get: function () { return browser.element('//span[@class="label label-danger"]');}},

  /**
   * Admin searches the uploaded file by the user
   */
  searchItem: {
    value: function() {
      browser.waitForLoading('//div[@id="loader"]');
      this.findProjectName.waitForVisible();
      var fileName = browser.params.fileName || require('../data/cad-drawings/filename.json').fileName;
      this.findProjectName.setValue(fileName);
      this.searchButton.waitForEnabled();
      this.searchButton.click();
    }
  },

  /**
   * Admin selects a person in charge for the uploaded file
   */
  selectPersonInCharge: {
    value: function() {
      browser.waitForLoading('//div[@id="loader"]');
      browser.mediumWait();
      this.checkboxSelectFile.waitForVisible();
      this.checkboxSelectFile.click();
      this.personInChargeDropdown.click();
      this.personInChargeList.waitForVisible();
      this.personInChargeList.click();
    }
  },

  /**
   * Verifies if person in charge icon and name is shown
   */
  verifySelectPersonInCharge: {
    value: function() {
      browser.smallWait();
      browser.scrollToElement(this.selectedPersonSelector);
      browser.pause(2000);
      this.checkSelectedPerson.waitForVisible();
      expect(this.checkSelectedPerson.getText()).to.be.equal(expectedData.personInCharge);
    }
  },

  /**
   * Verifies status column of uploaded project
   */
  verifyStatus: {
    value: function() {
      expect(this.status.getText()).to.be.equal(expectedData.status);
      var color = this.status.getCssProperty('background-color').parsed.hex;
      expect(expectedData.qtStatusColor).to.be.equal(color);
    }
  },

  /**
   * Admin opens the uploaded file by the user
   */
  openProject: {
    value: function() {
      //browser.params.qtProjectListId = browser.getCurrentTabId();
      if (browser.desiredCapabilities.browserName != "chrome") {
        var data = JSON.stringify({fileName: browser.params.fileName});
        const writePath = './data/cad-drawings/filename.json';
        fs.writeFile(writePath, data, function(err) {
          if (err) return console.log(err);
        });
      }
      this.product.waitForEnabled();
      browser.scrollToElement(this.productSelector);
      this.product.click();
      var windowHandles = browser.windowHandles();
      browser.switchTab(windowHandles.value[windowHandles.value.length - 1]);
    }
  },
};

module.exports = Object.create(Page, qtProjectListPage);