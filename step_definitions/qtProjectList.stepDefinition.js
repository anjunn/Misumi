let qtProjectListPage = require('../functions/qtProjectList.js');

module.exports = function () {

  this.When(/^Admin searches the uploaded file in QT project list$/, () => {
    qtProjectListPage.searchItem();
  });

  this.When(/^Admin selects the person in charge for the uploaded project$/, () => {
    qtProjectListPage.selectPersonInCharge();
  });

  this.Then(/^Admin verifies if the selected person in charge is displayed$/, {retry: 2}, () => {
    qtProjectListPage.verifySelectPersonInCharge();
  });

  this.Then(/^Verifies if order status and color is displayed correctly$/, () => {
    qtProjectListPage.verifyStatus();
  });

  this.When(/^Opens the file uploaded by the user to proceed to manual quotation$/, () => {
    qtProjectListPage.openProject();
  });

  this.When(/^Opens the file uploaded by the user from QT project list$/, {retry: 2}, () => {
    qtProjectListPage.openProject();
  });
};