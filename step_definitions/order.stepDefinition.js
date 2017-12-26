let orderPage = require('../functions/order.js');
let expectedData = require('../data/expected-results/common.json');
module.exports = function () {

  this.Given(/^User goes to order page$/, () => {
    orderPage.goToOrderPage();
  });

  this.Then(/^User validates the product name and order details in order page$/, () => {
    orderPage.orderPageValidation(expectedData.orderPageHeading);
  });

  this.Then(/^User places the order$/, () => {
    orderPage.placeOrder();
  });

  this.Then(/^The Order is succesfully placed$/, () => {
    orderPage.checkTitleThankYou(expectedData.thankyouHeading);
  });

  this.When(/^User goes to Order History Page$/, () => {
  	orderPage.goToOrderHistory();
  });
 
};
