let soProjectListPage = require('../functions/soProjectList.js');

module.exports = function () {

  this.When(/^Admin navigates to SO section in management site$/, () => {
      soProjectListPage.navigateToSo();
  });

  this.When(/^Admin searches the uploaded file in SO project list$/, () => {
      soProjectListPage.searchItem();
  });

  this.When(/^Admin selects the person in charge for the uploaded project in SO page$/, () => {
      soProjectListPage.selectPersonInCharge();
  });

  this.When(/^Admin verifies if the selected person in charge is displayed in SO page$/, () => {
      soProjectListPage.verifySelectPersonInCharge();
  });

  this.When(/^Verifies if the status and colour is displayed correctly in SO page$/, () => {
      soProjectListPage.verifyStatus();
  });

  this.When(/^Open the user uploaded file to proceed to manual quotation$/, () => {
      soProjectListPage.openProject();
  });
 
};