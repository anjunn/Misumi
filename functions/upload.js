let Page = require('./page');
let data=require('../data/input_data/dataset.json');

let misumi = {

  uploadId: { get: function () { return browser.element('//*[@id="uploadfile"]');} },
  waitForFormComponent: { get: function () { return browser.element('//form[@name="uploadform"]');} },

  upload: {
    value: function(url) {
      this.waitForFormComponent.waitForVisible();

      browser.execute(function () {
        var inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.id = 'inputFileDragHandler';
        document.body.appendChild(inputElement);
      });

      browser.chooseFile('#inputFileDragHandler', url);

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
        window.setTimeout(() => dispatchEvent(fakeDropEvent), 1500);
      });
    }
  }
};

module.exports = Object.create(Page,misumi);