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
  checkboxSelectFile: { get: function () { return browser.element('(//input[@type="checkbox"])[9]');}},
  findProjectName: { get: function () { return browser.element('//input[@id="findProjectName"]');}},
  searchButton: { get: function () { return browser.element('(//button[@type="submit"])[1]');}},
  personInChargeDropdown: { get: function () { return browser.element('(//button[@class="btn btn-primary no-tab dropdown-toggle"])[2]');}},
  personInChargeList: { get: function () { return browser.element('(//ul[@id="responsiblePerson"]//li)[1]/a');}},
  checkSelectedPerson: { get: function () { return browser.element('(//td[contains(@class, "ellipsis")])[5]');}},
  status: { get: function () { return browser.element('//span[@class="label label-danger"]');}},

  /**
   * Admin searches the uploaded file by the user
   */
  searchItem: {
    value: function() {
      this.findProjectName.waitForVisible();
      this.findProjectName.clearElement();
      browser.pause(2000);
      this.findProjectName.setValue(browser.params.fileName);
      browser.pause(2000);
      this.searchButton.waitForEnabled();
      this.searchButton.click();
    }
  },

  /**
   * Admin selects a person in charge for the uploaded file
   */
  selectPersonInCharge: {
    value: function() {
      this.checkboxSelectFile.waitForVisible();
      browser.pause(2000);
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
      browser.pause(2000);
      this.checkSelectedPerson.moveToObject();
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
      browser.params.qtProjectListId = browser.getCurrentTabId();
      this.product.waitForEnabled();
      this.product.moveToObject();
      this.product.click();
      var windowHandles = browser.windowHandles();
      browser.switchTab(windowHandles.value[1]);
    }
  },
};

module.exports = Object.create(Page, qtProjectListPage);