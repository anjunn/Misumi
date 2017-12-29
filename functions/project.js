let Page = require('./page');
let fs = require('fs');
let PNG = require('pngjs').PNG;
let pixelmatch = require('pixelmatch');
let expectedData = require('../data/expected-results/common.json');
/**
 * project Page Object
 *
 * @class functions/project
 * @type {Page}
 */
let  projectPage = {
  /**
   * define elements
   */
  thumbnail: { get : function() { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//figure/img'); }},
  chatBox: { get : function() { return browser.element('//div[@id="aibis-waiting"]/div[@class="titlebar"]'); }},
  arrow: { get: function() { return browser.element('//*[@id="wrapper"]/div[4]/p/a'); }},
  partsName: { value: function (part) { return browser.element(`(//span[@class="class"])[${part}]`); }},
  quantityChange: { get: function () { return browser.element('(//input[@type="number"])[1]'); }},
  priceText: { get: function () { return browser.element('//*[@id="boxAmount"]//span[@class="textBold"]'); }},
  partsPriceText: { value: function (n) { return browser.element(`(//p[@class="sum"]/span)[${n}]`); }},
  groupValue: { value: function (n) {return browser.element(`(//span[@class="groupItemCount"])[${n}]`); }},
  groupImage: { value: function (n) { return browser.element(`(//*[@class="group"]//img)[${n}]`);}},
  manualQuotationPinAndPlate: { get: function () { return browser.element('//*[@id="lstPartsBuy"]/div[4]/div[2]/div/p/a'); }},
  materialFieldPartsView: { get: function () { return browser.element('//*[@id="MATERIALTYPE.ARTICLE_TYPE_ID_6.6"]'); }},
  boxButtonpartsview: { get: function () { return browser.element('//ul[@id="boxButton"]/li[4]/a'); }},
  closePopUpButton:{ get: function () { return browser.element('//li[@id="closeBtn"]/a'); }},
  manualOkIconPartsView: { get: function () { return browser.element('//span[@class="status"]//img[@src="pres/img/com_status_ic02.png"]');}},
  unitPriceManuallyQuoted: { get: function () { return browser.element('//span[@class="status"]//img[@src="pres/img/com_status_ic02.png"]/../../../../div//p[contains(@class, "amount")]//span');}},
  totalPriceDisplayedInPartsView:  { get: function () { return browser.element('//div[@id="boxAmount"]');}},
  manualQuotationPlate: { get: function () { return browser.element('//div[@class="boxInfomation"]/p/a'); }},
  downloadButton:{ get: function () { return browser.element('//li[@class="btnDownload"]'); }},
  downloadPdfOption:{ get: function () { return browser.element('//a[contains(text(),"見積書（PDF）")]'); }},
  downloadCsvOption:{ get: function () { return browser.element('//a[contains(text(),"部品明細一覧（CSV）")]'); }},
  mainSelectionInSelectByPart:{ get: function () { return browser.element('//span[@class="multiCheck"]'); }},
  mainSelectionInSelectByPartDeselect:{ get: function () { return browser.element('//span[@class="multiCheck checked"]'); }},
  itemName:{ get: function () { return browser.element('(//ul[@class="menuSecond"]//li)[7]'); }},
  corePin:{ get: function () { return browser.element('(//a[contains(text(),"コアピン")])[1]'); }},
  checkPartSelect: { value: function (part) { return browser.element(`(//input[@type="checkbox" and @class="selectedGroup"])[${part}]`); }},
  customerOrderingNumberField:{ value: function (input) { return browser.element(`(//div[@class="customInput"]//input[@type="text"])[${input}]`);}},
  listFunctionOpen:{ get: function () { return browser.element('(//li[@class="btnLstFunc"])[3]'); }},
  closeList:{ get: function () { return browser.element('//li[@class="status01"]'); }},
  enterCustomerOderInList:{ get: function () { return browser.element('(//a[@class="level"])[5]'); }},
  batchInput:{ get: function () { return browser.element('//a[contains(text(),"パーツ名を枝番に一括入力")]'); }},
  closeButtonDialog:{ get: function () { return browser.element('//li[@id="closeBtn"]'); }},
  partNumberGroup:{ value: function (part) { return browser.element(`(//span[@class="partNameGroup"])[${part}]`); }},
  undoBatchInput:{ get: function () { return browser.element('//a[contains(text(),"一括入力を元に戻す")]'); }},
  inputWizardList:{ get: function () { return browser.element('//a[contains(text(),"入力ウィザード")]'); }},
  inputWizardInput1:{ get: function () { return browser.element('(//p[@class="input"]//input)[1]'); }},
  inputWizardInput2:{ get: function () { return browser.element('(//p[@class="input"]//input)[2]'); }},
  collectiveInputButton:{ get: function () { return browser.element('(//li[@class="btn"])[5]'); }},
  closeButton:{ get: function () { return browser.element('//li[@id="closeBtn"]'); }},
  corePinMultiplePin:{ get: function () { return browser.element('(//p[@class="model"])[1]//a'); }},
  changeMaterial:{ get: function () { return browser.element('(//div[@class="customSelect"]//select)[2]'); }},
  makeAnEstimate:{ get: function () { return browser.element('//a[contains(text(),"見積をする")]'); }},
  filterOption:{ get: function () { return browser.element('(//li[@class="btnLstFunc"])[2]'); }},
  itemNameFilter:{ get: function () { return browser.element('(//a[@class="level"])[4]');}},
  corePinFilter:{ get: function () { return browser.element('(//a[contains(text(),"コアピン")])[2]');}},
  corePinList: { value: function (n) {return browser.element(`(//span[@class="class"])[${n}]`); }},
  showAllOption:{ get: function () { return browser.element('//a[@id="displayAll"]');}},
  /*
   * Open project by clicking on thumbnail
   */
  openProject: {
    value: function() {
      this.thumbnail.waitForVisible();
      this.thumbnail.click();
      this.arrow.waitForVisible();
      browser.params.projectPageUrl = browser.getUrl().match(/^[^&]*/)[0];
    }
  },

  /*
   * Compare expected image with screenshot
   */
  compareImage: {
    value: function(actualImagePath, expectedImagePath) {
      this.chatBox.waitForVisible();
      this.arrow.waitForVisible();
      this.arrow.click();
      browser.pause(4000);
      browser.saveScreenshot('./data/screens/actual-screens/' + actualImagePath);
      this.arrow.click();
      var actualImage = fs.createReadStream('./data/screens/actual-screens/' + actualImagePath).pipe(new PNG()).on('parsed', doneReading);
      var expectedImage = fs.createReadStream('./data/screens/expected-screens/' + expectedImagePath).pipe(new PNG()).on('parsed', doneReading);
      var filesRead = 0;
      function doneReading() {
        if (++filesRead < 2) return;
        var diff = new PNG({width: actualImage.width, height: actualImage.height});
        var totalPixels = 768000;
        var pixelDiff = pixelmatch(actualImage.data, expectedImage.data, diff.data, actualImage.width, actualImage.height, {threshold: 0.1});
        var expectedDiff = ( (100 - expectedData.imageAccuracy) / 100 ) * totalPixels;
        console.log("Expected Diff: " + expectedDiff + ", Actual Diff: " + pixelDiff);
        expect(pixelDiff).to.be.below(expectedDiff);
      }
    }
  },

  /*
   * Increse quantity of part and verify price increases
   */
  quotionConditionInPartsView: {
    value: function(quantity, isPlate = false) {
      this.quantityChange.waitForEnabled();
      if (!isPlate) {
        var price = parseInt(this.priceText.getText().replace(/,/g, ""));
        expect(price).to.not.be.null;
      }
      browser.execute(function (quantity) {
        element = document.querySelector('input[type="number"]');
        element.value = quantity;
        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          element.dispatchEvent(evt);
        } else {
          element.fireEvent("onchange");
        }
      }, quantity);
      browser.pause(3000);
      if (!isPlate) {
        var newPrice  = parseInt(this.priceText.getText().replace(/,/g, ""));
        expect(newPrice).to.be.above(price);
      }
    }
  },

  /*
   * Verify part names and setting the price to params
   */
  validatePartNamesAndPrice: {
    value: function(names, count, pinType) {
      for (var i = 1; i <= count; i++) {
        browser.moveToObject(`(//span[@class="class"])[${i}]`);
        browser.pause(1000);
        var partName = this.partsName(i).getText();
        expect(partName).to.be.equal(names[`part${i}`]);
        if (pinType === 'single pin') {
          browser.params.singlePinPrice['part1'] = this.partsPriceText(i).getText();
        } else if (pinType === 'multiple pin') {
          this.partsPriceText(i).moveToObject();
          this.partsPriceText(i).waitForVisible();
          browser.params.multiplePinPrice[`part${i}`] = this.partsPriceText(i).getText();
        } else if (pinType === 'pin and plate') {
          if (count === 3) browser.params.pinAndPlatePrice[`part${i}`] = this.partsPriceText(i).getText();
        } else {
          browser.params.platePrice[`part${i}`] = this.partsPriceText(i).getText();
        }
      }
    }
  },

  /*
   * Verify grouping for multiple pin
   */
  checkGrouping: {
    value: function(grouping) {
      for (var i = 1; i <= 4; i++) {
        browser.moveToObject(`(//*[@class="groupItemCount"])[${i}]`);
        var parts = this.groupValue(i).getText();
        expect(parts).to.be.equal(`[${grouping[i-1]}]`);
        this.groupImage(i).isVisible();
      }
    }
  },

  /*
  * Request manual quotation by user for pin and pin and plate
  */
  estimateConditionPartsview: {
    value: function(estimateCondition, pinType) {
      if (pinType === 'pin and plate'){
        this.manualQuotationPinAndPlate.waitForVisible();
        this.manualQuotationPinAndPlate.click();
      } else {
        browser.pause(5000);
        this.manualQuotationPlate.waitForVisible();
        this.manualQuotationPlate.click();
      }
      this.materialFieldPartsView.waitForVisible();
      this.materialFieldPartsView.selectByVisibleText(estimateCondition.material);
      this.boxButtonpartsview.waitForEnabled();
      browser.pause(2000);
      this.boxButtonpartsview.click();
      browser.pause(2000);
      this.closePopUpButton.waitForVisible();
      this.closePopUpButton.click();
      browser.pause(2000);
    }
  },

  /*
  * Checks manually estimated icon is present
  */
  validateManualIconInPartsView: {
    value: function() {
      this.manualOkIconPartsView.waitForVisible();
      expect(this.manualOkIconPartsView.isVisible()).to.be.equal(true);
    }
  },

  /*
   * Checks unit price in parts view
   */
  validatePriceInPartsView: {
    value: function() {
      var unitPriceDisplayed = this.unitPriceManuallyQuoted.getText().match(/\d+/g).join(",");
      expect(unitPriceDisplayed).to.be.equal(expectedData.unitPrice);
      browser.url(browser.params.projectPageUrl);
    }
  },

  /*
   * Open the project after manual quotation is done and download pdf
   */
  downloadPdf: {
    value: function() {
      this.downloadButton.waitForVisible();
      this.downloadButton.click();
      this.downloadPdfOption.waitForVisible();
      this.downloadPdfOption.click();
    }
  },
  
  /*
   * Open the project after manual quotation is done and download pdf
   */
  downloadCsv: {
    value: function() {
      this.downloadCsvOption.waitForVisible();
      this.downloadCsvOption.click();
    }
  },

  /*
   * User selects core pin from the available parts, in select by product type
   */
    selectByProductType:{
    value: function() {
      this.mainSelectionInSelectByPart.waitForVisible();
      this.mainSelectionInSelectByPart.click();
      this.itemName.moveToObject();
      this.corePin.click();     
      }
    },

  /*
   * Verify if all the core pins are selected, finally deselect it
   */
    verifyCorePinSelected:{
    value: function(expectedPartsName,count,expectedCorePinCount) {
      var countCorePin=0;
      var countCheckedCheckBox=0;
      for(var i=1;i<=count;i++)
       {
         this.checkPartSelect(i).moveToObject();
         if(this.partsName(i).getText()==expectedPartsName.part2)
         { 
           this.checkPartSelect(i).isSelected();
           countCorePin= countCorePin +1;
         } 
         if(i==count)
         {

          this.customerOrderingNumberField(14).moveToObject();
         }
         if(this.checkPartSelect(i).isSelected())
         {
          countCheckedCheckBox=countCheckedCheckBox+1;
         }
       }   
      expect(countCorePin).to.be.equal(expectedCorePinCount);
      expect(countCheckedCheckBox).to.be.equal(countCorePin);
      this.mainSelectionInSelectByPartDeselect.moveToObject();
      this.mainSelectionInSelectByPartDeselect.click();
      this.closeList.waitForVisible();
      this.closeList.click();
      }
    },

  /*
   * User inputs Customer ordering number manually
   */
    customerOrdeingNumberManual:{
    value: function(count,part1,part2) {
      this.filterOption.waitForVisible();
      this.filterOption.click();
      this.showAllOption.click();
      this.customerOrderingNumberField(1).waitForVisible();
      for(var i=1;i<=count;i++)
      {  
       this.customerOrderingNumberField(i).moveToObject(); 
       if(i%2!=0)
        this.customerOrderingNumberField(i).setValue(part1);
       else
        this.customerOrderingNumberField(i).setValue(part2);
      }
    }
  },

  /*
   * User inputs Customer ordering number in batch input 
   */
  customerOrdeingNumberBatchInput:{
    value: function() { 
      browser.url(browser.params.projectPageUrl);  
      this.listFunctionOpen.waitForVisible();
      this.listFunctionOpen.click();
      this.enterCustomerOderInList.moveToObject();
      this.batchInput.click();
      this.closeButtonDialog.waitForVisible();
      this.closeButtonDialog.click();
      browser.pause(1000);     
      }
    },

  /*
   * User verifies batch input 
   */
    verifyBatchInput:{
    value: function(expected,count) {
      for(i=2,j=0;i<=count;j++)
      { 
        expect(this.customerOrderingNumberField(i).getValue()).to.equal(expected[j].part);
        i=i+2;
      }
      }
    },

  /*
   * User resets batch input 
   */
    resetBatchInput:{
    value: function(expected,count) {
      this.listFunctionOpen.waitForVisible();
      this.listFunctionOpen.click();
      this.enterCustomerOderInList.moveToObject();
      this.undoBatchInput.click();    
      }
    },

    /*
   * User gives customer ordering number by input wizard 
   */
    customerOrdeingNumberInputWizard:{
    value: function(func1,func2) {
      this.listFunctionOpen.waitForEnabled();
      this.listFunctionOpen.click();
      this.enterCustomerOderInList.moveToObject();
      this.inputWizardList.waitForVisible();
      this.inputWizardList.click();  
      this.inputWizardInput1.waitForVisible();
      this.inputWizardInput1.setValue(func1);
      this.inputWizardInput2.setValue(func2);
      this.collectiveInputButton.click();
      this.closeButton.waitForVisible();
      this.closeButton.click();
      this.closeButton.waitForVisible();
      this.closeButton.click();
      }
    },
  /*
   * User verifies Wizard input 
   */
    verifyInputWizard:{
    value: function(expected,projectName,count) {
   
      for(k=1,i=2,j=0;i<=count;j++)
      { 
        expect(this.customerOrderingNumberField(i).getValue()).to.equal(expected[j].part);
        expect(this.customerOrderingNumberField(k).getValue()).to.include(projectName);
        i=i+2;
        k=k+2;
      }
      }
    },

  /*
   * User selects one of the parts, core pin and changes the material
   */
    selectCorePin:{
    value: function(expected,count) {
      this.corePinMultiplePin.waitForVisible();
      this.corePinMultiplePin.click();
      this.changeMaterial.waitForEnabled();
      this.changeMaterial.selectByValue("NAK80");
      }
    },

  /*
   * User updates the the quotation
   */
    updateQuotation:{
    value: function(change) {
      this.makeAnEstimate.waitForEnabled();
      this.makeAnEstimate.click();
      expect(this.changeMaterial.getValue()).to.equal(change);
      }
    },

  /*
   * User selects filter and choose CorePin
   */
    selectFilterTakeCorePin:{
    value: function() {
      this.filterOption.click();
      this.itemNameFilter.moveToObject();
      this.corePinFilter.waitForVisible();
      this.corePinFilter.click();
      }
    },

  /*
   * User verifies if the filter of core pin has been proper
   */
    verifyFilterCorePin:{
    value: function(proj,multiplePinCount,corePinCount) {
      var count=0;
      for(i=1;i<=multiplePinCount;i++)
      {
         if(proj==this.corePinList(i).getText())
          {
           count=count+1;
          } 
      }
      expect(count).to.equal(corePinCount);
      
      }
    },
};
  
module.exports = Object.create(Page, projectPage);
