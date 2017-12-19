let loginPageManagement = require('../functions/managementLogin.js');
let data = require('../data/input-data/dataset.json');

module.exports = function () {

  this.Given(/^Admin goes to management site$/, () => {
    loginPageManagement.goToLoginPage();
  });

  this.When(/^Check if the login page of management site is shown$/, () => {
    loginPageManagement.validateLoginPage();
  });

  this.Then(/^The correct credentials are given and log in$/, () => {
    loginPageManagement.login();
  });

};