let Page = require('./page');

let  deleteProduct = {
  /**
   * define elements
   */
  
  menu: { get: function () { return browser.element('(//li[@class="dataBox"])[1]//ul[@class="projectmenu"]//span'); }},
  deleteOption: { get: function () { return browser.element('(//a[@class="btnDelete notEasescroll"])[1]'); }},
  waitLoader: { get: function () { return browser.element('//p[@class="listLoading"]//img'); }},
  okButton: { get: function () { return browser.element('//li[@id="okBtn"]'); }},
  deleteButton: { get: function () { return browser.element('(//li[@class="dataBox"])[1]//p[@class="deleteBtn"]//a'); }},
  waitFirstItem: { get: function () { return browser.element('(//li[@class="dataBox"])[1]'); }},
  siteLoad: { get: function () { return browser.element('//p[contains(text(),"3D CAD")]'); }},

  /*
   * Delete elements one by one
   */
  deleteProduct: {
    value: function() {
      this.siteLoad.waitForVisible();
      for(var i=1;;i++){
        if(!(this.waitFirstItem).isVisible())
          break;
        this.waitFirstItem.waitForEnabled();
        if(this.menu.isVisible()){
          this.menu.waitForVisible();
          this.menu.click();
          this.deleteOption.waitForVisible();
          this.deleteOption.click(); 
          browser.smallWait();
          if(!(this.okButton.isVisible()))
            continue;
          this.okButton.waitForEnabled();
          this.okButton.click();
          browser.mediumWait();
      } else{
          if(!(this.deleteButton.isVisible()))
            continue;
          this.deleteButton.waitForVisible();
          this.deleteButton.click();
           browser.smallWait();
          this.okButton.waitForVisible();
          this.okButton.click();
          browser.mediumWait();
          }
          browser.waitForLoading('//p[@class="listLoading"]//img');    
      }
    }
  },

};

module.exports = Object.create(Page, deleteProduct);
