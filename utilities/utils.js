/*
* Utility functions
*/

const commonUtilities = {
  /*
  * Wait till given element disappears
  */
  waitForLoading: function waitForLoading(element, index = 1, waitForExtraLoad = false) {
    waitTime = browser.options.waitforTimeout;
    try {
      browser.pause(1000);
      if (waitForExtraLoad) {
        browser.pause(500);
      }
      const isVisible = browser.isVisible(element);
      if (isVisible && index * 100 < waitTime) {
        this.waitForLoading(element, index + 1);
      } else if (isVisible && index * 100 >= waitTime) {
        throw `Processing not finished even after ${waitTime}`;
      } else if (!isVisible && !waitForExtraLoad) {
        this.waitForLoading(element, index, true);
      }
    } catch (err) {
      console.log(`Wait for Loading failed with error: ${err}`);
      throw err
    }
  },

  /*
  * Check if browser is at login page
  */
  isLoginPage: function(){
    var currentUrl = browser.getUrl();
    return currentUrl === "https://prs-origin-tst.meviy.misumi-ec.com/login";
  }
};

/**
 * Converts the above object to Custom Command
 */
module.exports = {
  init: function () {
    Object.keys(commonUtilities).forEach(function (key) {
      browser.addCommand(key, commonUtilities[key]);
    });
  }
};