let Page = require('./page');
let data = require('../data/input-data/dataset.json');
let base64Img = require('base64-img');
let fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx');
/**
 * upload Page Object
 *
 * @class functions/upload
 * @type {Page}
 */
let  uploadPage = {
  /**
   * define elements
   */
  waitForFormComponent: { get: function () { return browser.element('//form[@name="uploadform"]'); }},
  fileUploadProductName: { get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//p[@class="filename displayFileName"]'); }},
  proceedToEstimateButton: { get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//a[contains(text(), "見積りに進む")]'); }},
  nextButton: { get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//a[contains(text(), "次へ")]'); }},
  quantity: { get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//input[@type="number"]'); }},
  material: { get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//select[@name="materialId"]'); }},
  surfaceTreatment: { get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//select[@name="surfaceId"]'); }},
  tolerance:{ get: function () { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//select[@name="toleranceClassId"]'); }},
  thumbnail: { get : function() { return browser.element('//div[@class="dataLst clearfix"]/ul/li[1]//figure/img'); }},
  price: { get: function () { return browser.element('(//div[@class="dataLst clearfix"]/ul/li[1]//*[@class="price"]//span[2])[1]'); }},
  productName: { get: function () { return browser.element('(//*[@class="projectname"]//a)[1]'); }},
  productTypePinAndPlate: { get:function() {return browser.element('//form[@name="estimateCondSubmit"]//dd[@class="customSelect"]/select[@class="textBold"]');}},
  nextButtonPinAndPlate: { get:function() {return browser.element('//form[@name="estimateCondSubmit"]/ul/li[2]/a');}},
  nextButtonPlate: { get: function () { return browser.element('//form[@name="estimateCondSubmit"]/p[@class="btn"]/a'); }},
  productTypePlate: { get: function () { return browser.element('//select[@name="articleTypeId"]'); }},
  continueToEstimateConditionButton: { get: function () { return browser.element('//a[@class="linkEstimate"]'); }},
  priceInList: { get: function () { return browser.element('(//li[@class="dataBox"]//span[2])');}},
  autoOkIcon: { get: function () { return browser.element('//div[@class="dataLst clearfix"]//li[@class="status01"]');}},
  manualOkIcon: { get: function () { return browser.element('//div[@class="dataLst clearfix"]//li[@class="status02"]');}},
  uploadFileLink: { get: function () { return browser.element('//form[@name="uploadform"]//input[@id="uploadfile"]'); }},
  closeButton: { get: function () { return browser.element('//li[@id="closeBtn"]'); }},
  previous: { get: function () { return browser.element(' (//li[@class="btn btnColor04"])[2]'); }},
 
  /**
   * Upload file by triggering drop event
   */
  upload: {
    value: function(filePath) {

      this.waitForFormComponent.waitForVisible();

      var date = (new Date()).getTime();
      var newPath = filePath.replace(/(\.[\w\d_-]+)$/i, `${date}$1`);
      browser.params.fileName = path.basename(newPath);
      fs.rename(filePath, newPath, function() {});

      if (browser.desiredCapabilities.browserName != "chrome") {
        var data = JSON.stringify({fileName: browser.params.fileName});
        const writePath = './data/cad-drawings/filename.json';
        fs.writeFile(writePath, data, function(err) {
          if (err) return console.log(err);
        });
      }

      try {
        browser.execute(function () {
          var inputElement = document.createElement('input');
          inputElement.type = 'file';
          inputElement.id = 'inputFileDragHandler';
          document.body.appendChild(inputElement);
        });

        browser.chooseFile('#inputFileDragHandler', newPath);

        browser.execute(function () {
          function FakeDataTransfer(file) {
            this.dropEffect = 'all';
            this.effectAllowed = 'all';
            this.items = [];
            this.types = ['Files'];
            this.getData = function() {
              return file;
            };
            this.files = [file];
          };

          var dropEvent;
          var dragEvent;

          if (document.createEvent) {
            dragEvent = document.createEvent("HTMLEvents");
            dragEvent.initEvent("dragenter", true, true);
            dropEvent = document.createEvent("HTMLEvents");
            dropEvent.initEvent("drop", true, true);
          } else {
            dragEvent = document.createEventObject();
            dragEvent.eventType = "DragEvent";
            dropEvent = document.createEventObject();
            dropEvent.eventType = "DragEvent";
          }

          Object.defineProperty(dropEvent, 'dataTransfer', {
            value: new FakeDataTransfer(document.getElementById('inputFileDragHandler').files[0])
          });

          var element = document.querySelector('.dragArea');

          function dispatchEvent(fakeEvent) {
            if (document.createEvent) {
              element.dispatchEvent(fakeEvent);
            } else {
              element.fireEvent("on" + event.eventType, fakeEvent);
            }
          }

          dispatchEvent(dragEvent);
          window.setTimeout(function() { dispatchEvent(dropEvent) }, 1500);
        });
      } finally {
        fs.rename(newPath, filePath, function() {});
      }
    }
  },

  /**
   * Upload a file by selecting from dialog
   */
  uploadFromDialog: {
    value: function(filePath) {
      var date = (new Date()).getTime();
      var newPath = filePath.replace(/(\.[\w\d_-]+)$/i, `${date}$1`);
      browser.params.fileName = path.basename(newPath);
      try{
        fs.rename(filePath, newPath, function() {});
        browser.longWait();
        browser.chooseFile('#masonryArea > form > ul > li > label > input', newPath);
      }
      finally { 
        fs.rename(newPath, filePath, function() {}); 
      }
    }
  },

  /**
   * Verify project name and button visibilty
   */
  verifyUpload: {
    value: function() {
      browser.scroll();
      browser.waitForLoading('//span[@class="percent"]');
      browser.waitForLoading('//p[@class="situation loading"]/img');
      this.fileUploadProductName.waitForVisible();
      expect(this.fileUploadProductName.getText()).to.be.equal(browser.params.fileName);
      var buttonPresence = this.proceedToEstimateButton.isVisible() || this.nextButton.isVisible();
      expect(buttonPresence).to.be.equal(true);
    }
  },

  /**
   * Complete quotation condition for single, multiple pins and pin and plate
   */
  quotationConditionFill: {
    value: function(quotationCondition) {
      this.material.waitForEnabled();
      this.material.selectByVisibleText(quotationCondition.material);
      this.surfaceTreatment.waitForEnabled();
      this.surfaceTreatment.selectByVisibleText(quotationCondition.surfaceTreatment);
      this.tolerance.waitForEnabled();
      this.tolerance.selectByVisibleText(quotationCondition.toleranceGrade);
      if (this.proceedToEstimateButton.isVisible()) {
        this.proceedToEstimateButton.click();
      } else {
        this.nextButton.click();
        this.nextButtonPinAndPlate.waitForEnabled();
        this.productTypePinAndPlate.selectByVisibleText(quotationCondition.productType);
        this.nextButtonPinAndPlate.click();
      }
      if(this.closeButton.isVisible()){
        this.closeButton.click();
        if(this.previous.isVisible())
        {
          this.previous.click();
        }
        this.quotationConditionFill();
      }
    }
  },

  /*
   * Complete quotation condition for plate only
   */
  quotationConditionFillPlate: {
    value: function(quotationCondition) {
      this.quantity.waitForEnabled();
      this.productTypePlate.selectByVisibleText(quotationCondition.productTypePlate);
      this.nextButtonPlate.click();
    }
  },

  /*
   * Compare thumbnail with expected picture
   */
  checkThumbNail: {
    value: function(expectedThumbnail) {
      browser.waitForLoading('//span[@class="percent"]');
      this.thumbnail.waitForVisible();
      var thumbnail = this.thumbnail;
      browser.waitUntil(function(){
        return thumbnail.getAttribute('src').split(';')[0] == "data:image/png";
      }, 30000, 'Thumbnail failed to load after 30 seconds')
      var thumbnailData = this.thumbnail.getAttribute('src');
      var expectedData = base64Img.base64Sync('./data/screens/expected-screens/' + expectedThumbnail);
      expect(thumbnailData).to.be.equal(expectedData);
    }
  },

  /*
   * Check name and price and icon after thumbnail appears
   * Price is not checked for pin and plate and plate only
   */
  checkNameAndPrice: {
    value: function(pinType) {
      if (this.price.isVisible()) {
        browser.params.initialPrice = this.price.getText();
        expect(this.price.getText()).to.not.be.null;
      }
      expect(this.productName.getText()).to.be.equal(browser.params.fileName);
      if (pinType === 'single pin' || pinType === 'multiple pin') {
        expect(this.autoOkIcon.isVisible(), 'Automatic estimation failed').to.be.equal(true);
      }
    }
  },

  /**
   * User clicks on continue to estimate button
   */
  goToEstimateCondition: {
    value: function() {
      this.continueToEstimateConditionButton.waitForEnabled();
      this.continueToEstimateConditionButton.click();
    }
  },

  /*
   * Goes to my page
   */
  goToMyPage: {
    value: function () {
      browser.url(data.url.myPageUrl);
    }
  },

  /*
   * Checks Manual Quotation Okay Icon is present or not
   */
  checkManualQuotationIconInList:{
    value: function() {
      this.thumbnail.waitForVisible();
      expect(this.manualOkIcon.isVisible()).to.be.equal(true);
    }
  },

  /*
   * Validates the price in the project listing screen
   */
  validatePriceInList:{
    value: function() {
      this.thumbnail.waitForVisible();
      var totalPriceDisplayed = this.priceInList.getText();
      expect(totalPriceDisplayed).to.not.equal(null);
    }
  },

 /*
  * Read excel data
  */
  excelParsing:{
    value: function(){
      var sheets = xlsx.parse('./data/input-data/mst_qt_condition_type_defines.xlsx');
      var first_sheet = sheets[0];
      console.log(first_sheet.data);
    }
  },
  /*
   * Check combination on uploading 
   */
  checkCombination:{
    value: function(){
      var sheets = xlsx.parse('./data/input-data/mst_qt_condition_type_defines.xlsx');
      var referenceSheet = xlsx.parse('./data/input-data/conversion_table.xlsx');
      var estimationSheetData = sheets[data.combinationTable.estimationSheet].data;
      //-------------take the material name from the site--------------
      this.material.waitForEnabled();
      var materialArray = this.material.getText().split('\n');
      for(var i = 1; i < materialArray.length ; i++){  //---i starts from 1 as 0th option is please select----
        var selectedMaterial = materialArray[i];
        // -------------store the column values from sheet 2 in the material range in an array---------
        for(var c = 5 ; c <= 16; c++ ){
          var materialColumnEstimationSheet = estimationSheetData[c][data.combinationTable.estimationSheetArgValueColumn];
          for (var j = 2; j < materialArray.length ; j++) {
            var internalName = referenceSheet[data.conversionTable.conversionSheet].data[j][data.conversionTable.internalNameColumn];
            if(materialColumnEstimationSheet == internalName) {
              var displayName = referenceSheet[data.conversionTable.conversionSheet].data[j][data.conversionTable.dispayNameColumn];
              if (selectedMaterial == displayName){
                console.log("selectedMaterial: "+selectedMaterial);
                console.log("materialColumnEstimationSheet: "+materialColumnEstimationSheet);
                console.log("internalName:"+referenceSheet[data.conversionTable.conversionSheet].data[j][data.conversionTable.internalNameColumn]);
                console.log("displayName: "+referenceSheet[data.conversionTable.conversionSheet].data[j][data.conversionTable.dispayNameColumn]);
                console.log("check:true");
                //-----------------checking corresponding status column---------------------
                var materialStatus=estimationSheetData[c][data.combinationTable.estimationSheetStatusColumn];
                if(materialStatus=="Advanced"){
                  console.log(materialStatus);
                }
                break;  
              }
            }
          }  
        }
      }
    }
  }  
};

module.exports = Object.create(Page, uploadPage);
