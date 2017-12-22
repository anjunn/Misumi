let Page = require('./page');
let base64Img = require('base64-img');
let fs = require('fs');
var path = require('path');
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
  manualOkIcon: { get: function () { return browser.element(`//div[@class="dataLst clearfix"]//li[@class="status02"]`);}},

  /**
   * Upload file by triggering drop event
   */
  upload: {
    value: function(filePath) {

      var date = (new Date()).getTime();
      var newPath = filePath.replace(/(\.[\w\d_-]+)$/i, `${date}$1`);
      browser.params.fileName = path.basename(newPath);
      fs.rename(filePath, newPath, function() {});

      this.waitForFormComponent.waitForVisible();
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

          var fakeDropEvent;
          var fakeDragEvent;

          if (document.createEvent) {
            fakeDragEvent = document.createEvent("HTMLEvents");
            fakeDragEvent.initEvent("dragenter", true, true);
            fakeDropEvent = document.createEvent("HTMLEvents");
            fakeDropEvent.initEvent("drop", true, true);
          } else {
            fakeDragEvent = document.createEventObject();
            fakeDragEvent.eventType = "DragEvent";
            fakeDropEvent = document.createEventObject();
            fakeDropEvent.eventType = "DragEvent";
          }

          Object.defineProperty(fakeDropEvent, 'dataTransfer', {
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

          dispatchEvent(fakeDragEvent);
          window.setTimeout(function() { dispatchEvent(fakeDropEvent) }, 1500);
        });
      } finally {
        fs.rename(newPath, filePath, function() {});
      }
    }
  },

  /**
   * Verify project name and button visibilty
   */
  verifyUpload: {
    value: function() {
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
      this.quantity.waitForEnabled();
      this.material.selectByVisibleText(quotationCondition.material);
      this.surfaceTreatment.selectByVisibleText(quotationCondition.surfaceTreatment);
      this.tolerance.selectByVisibleText(quotationCondition.toleranceGrade);
      if (this.proceedToEstimateButton.isVisible()) {
        this.proceedToEstimateButton.click();
      } else {
        this.nextButton.click();
        this.nextButtonPinAndPlate.waitForEnabled();
        this.productTypePinAndPlate.selectByVisibleText(quotationCondition.productType);
        this.nextButtonPinAndPlate.click();
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
      var thumbnailData = this.thumbnail.getAttribute('src');
      var expectedData = base64Img.base64Sync('./data/screens/expected-screens/' + expectedThumbnail);
      expect(thumbnailData).to.be.equal(expectedData);
    }
  },

  /*
   * Check name and price after thumbnail appears
   * Price is not checked for pin and plate and plate only
   */
  checkNameAndPrice: {
    value: function() {
      if (this.price.isVisible()) {
        browser.params.initialPrice = this.price.getText();
        expect(this.price.getText()).to.not.be.null;
      }
      expect(this.productName.getText()).to.be.equal(browser.params.fileName);
    }
  },

  /*
   * Navigates to Estimate condition enter page
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
      browser.url('https://prs-origin-tst.meviy.misumi-ec.com/mypage');
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
  }

};

module.exports = Object.create(Page, uploadPage);
