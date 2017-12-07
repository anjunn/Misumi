/*
 Utility functions
*/

const commonUtilities = {
  waitForLoading: function waitForLoading(index = 1, waitForExtraLoad = false) {
    waitTime = browser.options.waitforTimeout;
    try {
      browser.pause(1000);
      if (waitForExtraLoad) {
        browser.pause(500);
      }
      const isVisible = browser.isVisible('//span[@class="percent"]');
      if (isVisible && index * 100 < waitTime) {
        this.waitForLoading(waitTime, index + 1);
      } else if (isVisible && index * 100 >= waitTime) {
        throw `Processing not finished even after ${waitTime}`;
      } else if (!isVisible && !waitForExtraLoad) {
        this.waitForLoading(waitTime, index, true);
      }
    } catch (err) {
      console.log(`Wait for Loading failed with error: ${err}`);
      throw err
    }
  }
};

/**
 * Converts the obove object to Custom Command
 */
module.exports = {
  init: function () {
    Object.keys(commonUtilities).forEach(function (key) {
      browser.addCommand(key, commonUtilities[key]);
    });
  }
};