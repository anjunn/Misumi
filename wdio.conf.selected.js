/**
 *
 * wdio.conf.iOSSim.js
 * Test configuration file used for iOS test environment
 * It uses Chome with Google Nexus 5 mobileEmulation
 *
 */
let merge = require('deepmerge');
let wdioConfChrome = require('./wdio.conf.chrome.js');

const getSelectedTestCases = function () {
  const tickets = (process.env.npm_config_selected || '').split(',');
  const suites = ['all', 'smokeTest', 'scenario9', 'scenario10'];
  let ticketToTest = [], testFilter;
  if (tickets.find((testSuite) => suites.includes(testSuite))) {
    tickets.forEach((ticket) => {
      ticketToTest = ticketToTest.concat(suites.includes(ticket) && wdioConfChrome.config.suites[ticket] || []);
    });
  } else if (tickets.length > 0) {
    tickets.forEach((ticket) => {
      testFilter = (tc) => (tc.indexOf(`MZ_${ticket}`) !== -1);
      suites.forEach((suite) => {
        ticketToTest = ticketToTest.concat(wdioConfChrome.config.suites[suite].filter(testFilter));
      });
    });
  }
  return ticketToTest;
};

let wdioSelectedConfig = merge(wdioConfChrome.config, {

  suites: {
    selected: getSelectedTestCases()
  }
});

exports.config = wdioSelectedConfig;


