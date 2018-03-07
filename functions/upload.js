let Page = require('./page');
let data = require('../data/input-data/dataset.json');
let base64Img = require('base64-img');
let fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx');
const resultPath = './Data/output/uploadExcelComparison.txt';
      

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
  surfaceItems: { value: function (n) { return browser.element(`(//div[@class="dataLst clearfix"]/ul/li[1]//select[@name="surfaceId"]//option)[${n}]`); }},
  materialItems: { value: function (n) { return browser.element(`//div[@class="dataLst clearfix"]/ul/li[1]//select[@name="materialId"]//option[${n}]`); }},
  listViewButton: { get: function () { return browser.element('//ul[@class="projectStyle"]//li[@class="list"]/a'); }},
  gridViewButton: { get: function () { return browser.element('//ul[@class="projectStyle"]//li[@class="card"]'); }},
  listView: { get: function () { return browser.element('//div[@id="masonryArea"][@class="clearfix styleList"]'); }},
  gridView: { get: function () { return browser.element('//div[@id="masonryArea"][@class="clearfix"]'); }},
  projectCountButton: { get: function () { return browser.element('//select[@class="textBold"]'); }},
  projectCount: { value: function (n) { return browser.element(`(//select[@class="textBold"]//option)[${n}]`); }},
  dataBox: { get: function () { return browser.elements('//li[@class="dataBox"]'); }},

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
      browser.extraLongWait();
      this.material.waitForEnabled();
      this.material.click();
      this.material.selectByValue(quotationCondition.material);
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
      let env = process.env.npm_config_env || 'tst';
      const urlData = browser.filterByUsage(env)[0];
      url = urlData;
      browser.url(url.myPageUrl);
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
   * Check combination of Material to SurfaceTreatment in site with the same from Excel sheet
   */
  checkCombinationMaterialToSurfacetreatment:{
    value: function(){
      console.log("Checking Combination: Material To Surfacetreatment");
      console.log("----------------------------------------------");
      fs.writeFile(resultPath,"Failed Cases:\n"+"\nChecking Combination: Material To Surfacetreatment\n"+"**************************************************\n", function(err) {
        if (err) return console.log(err);
      });
      var sheets = xlsx.parse(data.combinationTableData.combinationTable);
      var estSheetData = sheets[data.combinationTableData.estimationSheet].data;
      this.material.waitForEnabled();
      var materialArray = this.material.getText().split('\n');
      console.log("material array: "+ materialArray);
      var materialLength = materialArray.length;
      console.log("materialLength: "+materialLength);
      for(var i = 2; i < materialLength ; i++){ //material taking from site 
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.material.click();
        this.materialItems(i).click();
        browser.smallWait();
        var selectedMaterial = this.materialItems(i).getText();
        console.log("SelectedMaterial from site: "+selectedMaterial);
        var surfaceTypeArray = this.surfaceTreatment.getText().split('\n');
        console.log("surfaceTypeArray: "+surfaceTypeArray);
        var internalNameMaterial = this.findInternalName(selectedMaterial);
        for(var c = 5 ; c < estSheetData.length; c++ ){
          if(estSheetData[c][data.combinationTableData.estimationSheetQuotationColumn]===data.tableContent.material) {
            var materialColumnEstSheet = estSheetData[c][data.combinationTableData.estimationSheetNameColumn];
            if(materialColumnEstSheet.includes(selectedMaterial)) {
              var materialStatus=estSheetData[c][data.combinationTableData.estimationSheetStatusColumn];
              console.log("==================================================");
              if(materialStatus==="Advanced"){
                var qtSheetData=sheets[data.combinationTableData.qtSheet].data;
                var rowLength = qtSheetData.length;
                for(var row = 5; row < rowLength; row++){
                  var articleTypeId = qtSheetData[row][data.combinationTableData.qtSheetArticleTypeIdColumn], 
                  quotationCondition = qtSheetData[row][data.combinationTableData.qtSheetQuotationColumn],
                  nameColumn = qtSheetData[row][data.combinationTableData.nameColumn], 
                  materialType = qtSheetData[row][data.combinationTableData.materialType],
                  surfaceType = qtSheetData[row][data.combinationTableData.surfaceType],
                  conditional = qtSheetData[row][data.combinationTableData.conditional],
                  surfaceId, surfaceName, surfaceNameDN, surfaceIN;
                  if(articleTypeId === data.tableContent.articleTypeOther && quotationCondition === data.tableContent.material){
                    if(nameColumn === selectedMaterial) { 
                      if(materialType === "ANY" && typeof(surfaceType)!="undefined" && typeof(conditional)==="undefined") {
                        var qtSheetStatus = qtSheetData[row][data.combinationTableData.status];
                      }
                      if(materialType === "ANY" && surfaceType === "ANY"){
                        continue;
                      }
                      if(qtSheetStatus === "Recommended"){
                        console.log("-------------------------------");
                        console.log("Recommended surfaceType: "+surfaceType);
                        var recommended = 0;
                        for (var z = 1; z <= surfaceTypeArray.length; z++) {
                          surfaceId = this.surfaceItems(z).getValue();
                          if(surfaceId === data.dropdownDisabledState){
                            break;
                          } else {
                            surfaceName = this.surfaceItems(z).getText();
                            surfaceIN = this.findInternalName(surfaceName);
                            if(surfaceIN === surfaceType){
                              console.log("surfaceName from site: "+surfaceIN);
                              recommended = 1;
                            }
                          }
                        }
                        if(recommended === 1){
                          console.log("Recommended displayed");
                        } else {
                          console.log("Recommended failed!!!");
                          fs.appendFile(resultPath,"\nRecommended failed!"+"\nSelected Material: "+selectedMaterial+" Surface Treatment: "+surfaceType+" Status: "+qtSheetStatus+"\n"+"Row Number: "+(row+1)+"\n\n", function(err) {
                          if (err) return console.log(err); });
                        }
                      } else if(qtSheetStatus === "NotRecommended"){
                        console.log("-------------------------------");
                        console.log("NotRecommended surfaceType: "+surfaceType);
                        var notRecommended=0;
                        for (var w = 2; w <= surfaceTypeArray.length; w++) {
                          surfaceId = this.surfaceItems(w).getValue();
                          if(surfaceId != data.dropdownDisabledState){
                            continue;
                          } else if(surfaceId === data.dropdownDisabledState) {
                            var y = w+1; 
                          }
                          for (; y <= surfaceTypeArray.length; y++){
                            var surfaceName1 = this.surfaceItems(y).getText();
                            var surfaceIN1 = this.findInternalName(surfaceName1);
                            if(surfaceIN1 === surfaceType){
                              console.log("surfaceType from sheet: "+surfaceType);
                              notRecommended = 1;
                            }
                          } 
                        }
                        if(notRecommended === 1){
                          console.log("NotRecommended properlydisplayed");
                        } else{
                          console.log("NotRecommended failed!!!");
                          fs.appendFile(resultPath,"\nNotRecommended failed!"+"\nSelected Material: "+selectedMaterial+" Surface Treatment: "+surfaceType+" Status: "+qtSheetStatus+"\n"+"Row Number: "+(row+1)+"\n\n", function(err) {
                          if (err) return console.log(err); });
                        }
                      } else if (qtSheetStatus === "NotSupported"){
                        console.log("-------------------------------");
                        console.log("NotSupported surfaceType: "+surfaceType);
                        var notSupported=0;
                        for (var q = 2; q < surfaceTypeArray.length; q++) {
                          var surfaceName2 = this.surfaceItems(q).getText();
                           var surfaceIN2 = this.findInternalName(surfaceName2);
                           if(surfaceIN2 === surfaceType){
                            console.log("surfaceType from sheet: "+surfaceType);
                            notSupported = 1;
                          } 
                        }
                        if(notSupported === 0){
                          console.log("NotSupported passed");
                        } else {
                          console.log("NotSupported failed!!!");
                          fs.appendFile(resultPath,"\nNotSupported failed!"+"\nSelected Material: "+selectedMaterial+" Surface Treatment: "+surfaceType+" Status: "+qtSheetStatus+"\n"+"Row Number: "+(row+1)+"\n\n", function(err) {
                          if (err) return console.log(err); });
                        }
                      }
                    }
                  }
                }
              }
              break;
            }
          }
        }
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      }
    }
  },
  /*
   * Check combination of SurfaceTreatment to Material in site with the same from Excel sheet
   */
  checkCombinationSurfacetreatmentToMaterial:{
    value: function(){
      console.log("check Combination Surfacetreatment To Material");
      console.log("----------------------------------------------");
      fs.appendFile(resultPath,"Checking Combination: Surfacetreatment To Material\n"+"**************************************************\n", function(err) {
        if (err) return console.log(err);
      });
      var sheets = xlsx.parse(data.combinationTableData.combinationTable);
      var estSheetData = sheets[data.combinationTableData.estimationSheet].data;
      var qtSheetData=sheets[data.combinationTableData.qtSheet].data;
      var rowLength = qtSheetData.length;
      browser.refresh();
      this.surfaceTreatment.waitForEnabled();
      var surfaceTypeArray = this.surfaceTreatment.getText().split('\n');
      var surfaceTypeArrayLength = surfaceTypeArray.length;
      var fullMaterialArray = this.material.getText().split('\n');
      console.log("fullMaterialArray: "+fullMaterialArray+"\n"+"fullMaterialArrayLength: "+fullMaterialArray.length);
      console.log("surfaceTypeArray: "+surfaceTypeArray+"\n"+"surfaceTypeArrayLength: "+surfaceTypeArrayLength);
      for(var i = 2; i <= surfaceTypeArrayLength ; i++){
        console.log("#########################################################"); 
        this.surfaceTreatment.click();
        this.surfaceItems(i).click();
        browser.smallWait();
        var selectedSurfaceTreatment = this.surfaceItems(i).getText();
        console.log("No: "+i+" Selected SurfaceTreatment: "+ selectedSurfaceTreatment,": " ,this.findInternalName(selectedSurfaceTreatment));
        var materialArray = this.material.getText().split('\n');
        console.log("materialArray: "+materialArray);
        console.log("materialArray.length: "+materialArray.length);
        for(var row = 5; row < rowLength; row++){
          var articleTypeId = qtSheetData[row][data.combinationTableData.qtSheetArticleTypeIdColumn], 
          quotationCondition = qtSheetData[row][data.combinationTableData.qtSheetQuotationColumn],
          nameColumn = qtSheetData[row][data.combinationTableData.nameColumn], 
          materialType = qtSheetData[row][data.combinationTableData.materialType],
          surfaceType = qtSheetData[row][data.combinationTableData.surfaceType],
          conditional = qtSheetData[row][data.combinationTableData.conditional],
          materialId, materialName, materialDN, materialIN;;
          if(articleTypeId === data.tableContent.articleTypeOther && quotationCondition === data.tableContent.surfaceTreatment){
            if(nameColumn.includes(selectedSurfaceTreatment)){
              if(surfaceType === "ANY" && typeof(materialType)!="undefined" && typeof(conditional)==="undefined") {
                var qtSheetStatus = qtSheetData[row][data.combinationTableData.status];
              }
              if(materialType === "ANY" && surfaceType === "ANY"){
                continue;
              } 
              if(qtSheetStatus === "Recommended"){
                for(var c = 5 ; c < estSheetData.length; c++ ){ 
                  if(estSheetData[c][data.combinationTableData.estimationSheetArticleTypeIdColumn]===data.tableContent.articleTypeOther){
                    if(estSheetData[c][data.combinationTableData.estimationSheetQuotationColumn]===data.tableContent.material) {
                      var argColumnEstSheet = estSheetData[c][data.combinationTableData.estimationSheetArgValueColumn];
                      if(argColumnEstSheet===materialType) {
                        var materialStatus=estSheetData[c][data.combinationTableData.estimationSheetStatusColumn];
                        if(materialStatus==="Advanced"){
                          console.log("-------------------------------");
                          console.log("Recommended material: "+materialType);
                          var recommended = 0;
                          for (var z = 2; z <= materialArray.length; z++) {
                            materialId = this.materialItems(z).getValue();
                            if(materialId === data.dropdownDisabledState){
                              break;
                            } else {
                              materialName = this.materialItems(z).getText();
                              materialIN = this.findInternalName(materialName);
                              if(materialIN === materialType){
                                console.log("materialName from site: "+materialIN);
                                recommended = 1;
                              }
                            }
                          }
                          if(recommended === 1){
                            console.log("Recommended passed");
                          } else {
                            console.log("Recommended failed to display!!!");
                            fs.appendFile(resultPath,"\nRecommended failed! "+"\nSelected surfaceType: "+selectedSurfaceTreatment+" Material: "+materialType+" Status: "+qtSheetStatus+"\n"+"Row Number: "+(row+1)+"\n\n", function(err) {
                            if (err) return console.log(err); });
                          } 
                          break;
                        } else{
                          console.log("Material: ", materialType,"- Status: ",materialStatus, "- Row: ", row, "- c: ",c);
                        }
                      }
                    }
                  }
                }
              } else if(qtSheetStatus === "NotRecommended"){
                for(var c = 5 ; c < estSheetData.length; c++ ){ 
                  var estArticleType = estSheetData[c][data.combinationTableData.estimationSheetArticleTypeIdColumn],
                  estQuotation = estSheetData[c][data.combinationTableData.estimationSheetQuotationColumn];
                  if(estArticleType===data.tableContent.articleTypeOther && estQuotation===data.tableContent.material){
                    var argColumnEstSheet = estSheetData[c][data.combinationTableData.estimationSheetArgValueColumn];
                    if(argColumnEstSheet===materialType) {
                      var materialStatus=estSheetData[c][data.combinationTableData.estimationSheetStatusColumn];
                      if(materialStatus==="Advanced"){
                        console.log("-------------------------------");
                        console.log("NotRecommended material: "+materialType);
                        var notRecommended=0;
                        for (var w = 2; w <= materialArray.length; w++) {
                          materialId = this.materialItems(w).getValue();
                          if(materialId != data.dropdownDisabledState){
                            continue;
                          } else if(materialId === data.dropdownDisabledState) {
                            var y = w+1; 
                          }
                          for (; y <= materialArray.length; y++){
                            materialName1 = this.materialItems(y).getText();
                            materialIN1 = this.findInternalName(materialName1);
                            if(materialIN1 === materialType){
                              console.log("materialType from sheet: "+materialType);
                              notRecommended = 1;
                              break;
                            }
                          } 
                        }
                        if(notRecommended === 1){
                          console.log("NotRecommended properlydisplayed");
                        } else{
                          console.log("NotRecommended failed to display!!!");
                          fs.appendFile(resultPath,"\nNotRecommended failed! "+"\nSelected surfaceType: "+selectedSurfaceTreatment+" Material: "+materialType+" Status: "+qtSheetStatus+"\n"+"Row Number: "+(row+1)+"\n\n", function(err) {
                          if (err) return console.log(err); });
                        }
                        break;
                      } else {
                        console.log("Material: ", materialType,"- Status: ",materialStatus, "- Row: ", row+1 , "- c: ",c+1);
                        break;
                      }
                    }
                  }
                }
              } else if (qtSheetStatus === "NotSupported"){
                for(var c = 5 ; c < estSheetData.length; c++ ){ 
                  var estArticleType = estSheetData[c][data.combinationTableData.estimationSheetArticleTypeIdColumn],
                  estQuotation = estSheetData[c][data.combinationTableData.estimationSheetQuotationColumn];
                  if(estArticleType===data.tableContent.articleTypeOther && estQuotation===data.tableContent.material){
                    var argColumnEstSheet = estSheetData[c][data.combinationTableData.estimationSheetArgValueColumn];
                    if(argColumnEstSheet===materialType) {
                      var materialStatus=estSheetData[c][data.combinationTableData.estimationSheetStatusColumn];
                      if(materialStatus==="Advanced"){
                        console.log("-------------------------------");
                        console.log("NotSupported material: "+materialType);
                        var notSupported=0;
                        for (var q = 2; q <= materialArray.length; q++) {
                          materialName2 = this.materialItems(q).getText();
                          materialIN2 = this.findInternalName(materialName2);
                          if(materialIN2 === materialType){
                            console.log("materialType from sheet: "+materialType);
                            notSupported = 1;
                          } 
                        }
                        if(notSupported === 0){
                          console.log("NotSupported passed");
                        } else {
                          console.log("NotSupported displayed!!!");
                          fs.appendFile(resultPath,"\nNotSupported failed! "+"\nSelected surfaceType: "+selectedSurfaceTreatment+" Material: "+materialType+" Status: "+qtSheetStatus+"\n"+"Row Number: "+(row+1)+"\n\n", function(err) {
                          if (err) return console.log(err); });
                        }
                      } else{
                        console.log("Material: ", materialType,"- Status: ",materialStatus, "- Row: ", row+1 , "- c: ",c+1);
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        console.log("#########################################################"); 
      }
    }
  },

  /*
   * Finds internal name of display name 
   */
  findInternalName:{
    value: function(name){
      var refSheet = xlsx.parse(data.conversionTableData.conversionTable);
      var refSheetData = refSheet[data.conversionTableData.conversionSheet].data;
      for (var j = 2; j < refSheetData.length ; j++) {  
        var displayName = refSheetData[j][data.conversionTableData.displayNameColumn];
        if (name === displayName){
          var internalName = refSheetData[j][data.conversionTableData.internalNameColumn];
          return internalName;
          break;
        }
      }
    }
  },
  /*
   * Finds display name of inernal name 
   */
  findDisplayName:{
    value: function(name){
      var refSheet = xlsx.parse(data.conversionTableData.conversionTable);
      var refSheetData = refSheet[data.conversionTableData.conversionSheet].data;
      for (var j = 2; j < refSheetData.length ; j++) {  
        var internalName = refSheetData[j][data.conversionTableData.internalNameColumn];
        if (name === displayName){
          var displayName = refSheetData[j][data.conversionTableData.displayNameColumn];
          return displayName;
          break;
        }
      }
    }
  },
  /*
   * Finds internal name of display name 
   */
  pageRefresh:{
    value: function(){    
      this.surfaceTreatment.click();
      browser.extraLongWait();
      this.surfaceItems(1).click();
      browser.refresh();
      browser.extraLongWait();

    }
  },
  /*
   * Checking project listing style; Grid view & List view  
   */
  checkProjectListStyle:{
    value: function(){
      this.listViewButton.waitForEnabled();
      this.listViewButton.click();
      browser.mediumWait();
      expect(this.listView.isVisible());
      console.log("List view enabled");
      this.gridViewButton.waitForEnabled();
      this.gridViewButton.click();
      browser.mediumWait();
      expect(this.gridView.isVisible());
      console.log("Grid view enabled");
    }
  }, 
  /*
   * Checking project count displayed in the upload screen 
   */
  checkProjectCount:{
    value: function(){
      this.projectCountButton.waitForEnabled();
      this.projectCountButton.click();
      var list = this.projectCountButton.getText().split('\n');
      var listLength = list.length;
      for (var i = 1; i <= listLength; i++){
        this.projectCount(i).waitForEnabled();
        this.projectCount(i).click();
        browser.mediumWait();
        var countSelected = parseInt(this.projectCount(i).getValue());
        console.log("Selected count: ", countSelected);
        var length = this.dataBox.value.length; 
        console.log("Items displayed in a single page: ",length);
        expect(length).to.be.equal(countSelected);
        console.log("count matched");
        browser.refresh();
      }
    }
  }
};

module.exports = Object.create(Page, uploadPage);
