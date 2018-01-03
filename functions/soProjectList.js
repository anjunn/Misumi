let Page = require('./page');
let data = require('../data/input-data/dataset.json');
let expectedData = require('../data/expected-results/common.json');
/**
 * Login Page Object
 *
 * @class functions/management/LoginPage
 * @type {Page}
 */
let soProjectListPage = {
  /**
   * define elements
   */
  findProjectName: { get: function () { return browser.element('//input[@id="findProjectName"]');}},
  searchButton: { get: function () { return browser.element('(//button[@type="submit"])[1]');}},
  soButton: { get: function () { return browser.element('//a[contains(text(),"ＳＯ ")]');}},
  soProjectlist: { get: function () { return browser.element('//ul[@class="nav navbar-nav"]//a[contains(text(),"ＳＯプロジェクト一覧")]');}},
  checkboxSelectFile: { get: function () { return browser.element('(//input[@type="checkbox"])[9]');}},
  personInChargeDropdown: { get: function () { return browser.element('((//button[contains(text(), "担当者")])[1])');}},
  personInChargeList: { get: function () { return browser.element('(//ul[@class="dropdown-menu"]//a[contains(text(), "CCT村澤")])');}},
  checkSelectedPerson: { get: function () { return browser.element('(//td[contains(@class,"ellipsis")])[6]');}},
  productName: { value: function (n) {return browser.element(`(//td[contains(@class,"linkColor")][3])[${n}]`);}},
  product: { get: function () { return browser.element('//table[@id="detailTable"]/tbody//td[@class="ellipsis linkColor"][3]/a');}},
  status: { get: function () { return browser.element('//td[@class="text-center"][2]');}},

  /**
   * Admin searches the uploaded file by the user
   */
  searchItem: {
    value: function() {
      browser.waitForLoading('//div[@id="loader"]');
      this.findProjectName.waitForVisible();
      this.findProjectName.clearElement();
      this.findProjectName.setValue(browser.params.fileName);
      this.searchButton.waitForEnabled();
      this.searchButton.click();
    }
  },

  /**
   * Admin navigates to SO section in management site
   */
   navigateToSo: {
    value: function() {
     browser.waitForLoading('//div[@id="loader"]');
     this.soButton.waitForVisible();
     this.soButton.click();
     this.soProjectlist.waitForVisible();
     this.soProjectlist.click();
     let handles = browser.windowHandles();
     browser.switchTab(handles.value[handles.value.length - 1]);
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
      this.status.waitForVisible();
      expect(this.status.getText()).to.be.equal("未対応");
      // var color = this.status.getCssProperty('background-color').parsed.hex;
      // expect(expectedData.soStatusColor).to.be.equal(color);
    }
  },

  /**
   * Admin opens the uploaded file by the user
   */
  openProject: {
    value: function() {
      this.product.waitForEnabled();
      this.product.moveToObject();
      this.product.click();
      browser.pause(2000);
      let windowHandles = browser.windowHandles();
      browser.switchTab(windowHandles.value[windowHandles.value.length - 1]);
    }
  },
};
module.exports = Object.create(Page, soProjectListPage);
