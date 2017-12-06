let loginPage= require('../functions/login.js');
let upLoadpage= require('../functions/upload.js');
let data = require('../Data/dataset.js');

module.exports = function () {

  this.Given(/^User access sample 3D page$/, () => {
    //browser.url('https://prs-origin-tst.meviy.misumi-ec.com/');
  });

  this.When(/^User login to meviy$/, () => {
    browser.url('https://prs-origin-tst.meviy.misumi-ec.com/login')
    let loginDetails= data.loginCredentials[0];
    loginPage.loginToMeviy(loginDetails);
  });

  this.Then(/User lands in mypage url$/, () => {
  	loginPage.checkUrl();
      });
};