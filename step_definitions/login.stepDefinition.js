let loginPage = require('../functions/login.js');
let data = require('../data/input-data/dataset.json');

module.exports = function () {

  this.Given(/^User goes to Home Page$/, () => {
    loginPage.goToHomePage();
  });

  this.Then(/^User validates the webpage header$/, () => {
  	loginPage.validateWebpageHeader();  	
  });

  this.Then(/^User validates the Start Right Away button$/, () => {
  	loginPage.validateRightAwayButton();
  });

  this.When(/^User goes to Login Page$/, () => {
   	loginPage.goToLoginPage();
  });

  this.When(/^User is redirected to Login Page$/, () => {
    loginPage.validateLoginPageUrl();
  });

  this.Then(/^User validates username field$/, () => {
   	loginPage.validateUserNameField();
  });

  this.Then(/^User validates Password field$/, () => {
   	loginPage.validatePasswordField();
  });

  this.Then(/^User enters credentials and logs in$/, () => {
    loginPage.login();
  });

  this.When(/^User logs out$/, () => {
    loginPage.logout();
  });
};