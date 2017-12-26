let soProjectPage = require('../functions/soProject.js');
let pinAndPlateExpectedData = require('../data/expected-results/pin-and-plate.json');
let pinAndPlateInputData = require('../data/input-data/pin-and-plate.json');

module.exports = function () {

  this.Given(/^Admin selects the supplier from so page$/, () => {
    soProjectPage.selectSupplier();
  });

    this.Given(/^Admin sends email to the supplier$/, () => {
    soProjectPage.sendMailToSupplier();
  });
  this.Given(/^Admin verifies if the send email pop up is shown and clicks ok in SO page$/, () => {
    soProjectPage.verifySendMail();
  });

};