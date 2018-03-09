let wosPage = require('../functions/wos.js');
let data = require('../data/input-data/dataset.json');
module.exports = function () {

  this.Then(/^User verifies if the quantity and model number in Order input page is same as shown in presentation$/, () => {
      wosPage.checkQuantityAndModel();
  });

  this.Given(/^User clicks on the next button$/, () => {
      wosPage.clickNext();
  });

  this.Given(/^User clicks the close button in the popup$/, () => {
      wosPage.clickcloseButton();
  });

  this.When(/^User verifies price,model number and quantity is shown in specify shipping date page$/, () => {
      wosPage.verifyDetails();
  });

  this.Then(/^User clicks the next button in Specify shipping date page$/, () => {
      wosPage.clickNextButtonInShippingDatePage();
  });

  this.Given(/^User is in Order Confirmation page and verifies the product details$/, () => {
      wosPage.verifyDetailsOrderConfirmationPage();
  });
  this.When(/^User clicks next in Order Confirmation page$/, () => {
      wosPage.clickNextOrderConfirmationPage();
  });

   this.When(/^User gets the purchase order number from the Order Complete page$/, () => {
      wosPage.getPurchaseOrderNumber();
  });

   this.Given(/^User switches to presentation, and checks if he is in mypage$/, () => {
      wosPage.switchToMyPage(data.url.myPageUrl);
  });

};
