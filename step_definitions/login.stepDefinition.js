let loginPage = require('../functions/login.js');
let data = require('../data/input_data/dataset.json');
let expectedData = require('../data/expected_results/common.json');

module.exports = function () {

  this.Given(/^User access sample 3D page$/, () => {
    browser.url('https://prs-origin-tst.meviy.misumi-ec.com/');
  });

  this.Then(/^User is able to see the webpage header$/, () => {
  	var exp = loginPage.checkHomePage();
  	expect(expectedData.homePageTitle).to.equal(exp);
  });

  this.Then(/^User is able to view Start Right away button$/, () => {
  	var vis = loginPage.checkRightAwayBtn();
  	expect(vis).to.equal("true");
  });

  this.When(/^User is at login page$/, () => {
    loginPage.clickStartRightAwayButton();
   	loginPage.validateLoginBtn();
  });

  this.Then(/^User validates Member ID field$/, () => {
   	loginPage.validateMemberID();
  });

  this.Then(/^User validates Password field$/, () => {
   	loginPage.validatePassword();
  });

  this.Then(/^User enters Member Id and password$/, () => {
    let loginDetails = data.loginCredentials[1];
    loginPage.memberLogin(loginDetails);
  });

    this.When(/^User clicks Start Right Away button in homepage$/, () => {
    loginPage.clickStartRightAwayButton();
  });
};