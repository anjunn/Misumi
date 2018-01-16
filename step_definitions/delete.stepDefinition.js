let deleteItem = require('../functions/delete');
module.exports = function () {

  this.Given(/^User deletes the products item by item$/, () => {
    deleteItem.deleteProduct();
  });
 };