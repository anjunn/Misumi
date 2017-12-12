let loginPage= require('../functions/login.js');
let upLoadpage= require('../functions/upload.js');
let data = require('../data/input_data/dataset.json');
let expect1 = require('../data/expected_results/general_misumi.json');

module.exports = function () {

  this.Given(/^User access sample 3D page$/, () => {
   browser.url('https://prs-origin-tst.meviy.misumi-ec.com/');
  });  

  this.Then(/^User is able to see the webpage header$/, () => {
	var exp =loginPage.checkHomePage();
	expect(expect1.expected_Text.home_Page_Title).to.equal(exp);
  });
  
  this.Then(/^User is able to view Start Right away button$/, () => {
  	var vis=loginPage.checkRightAwayBtn()
  	expect(vis).to.equal("true");

  });

  this.When(/^User is at login page$/, () => {
   	loginPage.validateLoginBtn();
  });

  this.Then(/^User validates Member ID field$/, () => {
   	loginPage.validateMemberID();
   });

  this.Then(/^User validates Password field$/, () => {
   	loginPage.validatePassword();
   });
  
   
   this.Then(/^User enters Member Id and password$/, () => {
     let loginDetails= data.loginCredentials[0];
     loginPage.memberLogin(loginDetails);
    });
};