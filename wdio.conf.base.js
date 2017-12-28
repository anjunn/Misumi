/**
 *
 * wdio.conf.base.js
 * Basic test configuration file that will be extended by specific environment test configuration files
 *
 */
exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //

  suites: {
    scenario1: [
      './feature/MZ_001-singlePinUpload.feature'
    ],
    scenario2: [
      './feature/MZ_002-multiplePinUpload.feature'
    ],
    scenario3: [
      './feature/MZ_003-pinAndPlateUpload.feature'
    ],

    scenario4: [
      './feature/MZ_004-plateUpload.feature'
    ],
    scenario5: [
      './feature/MZ_005-screenOperations.feature'
    ],
    scenario6: [
      './feature/MZ_006-contentChecking.feature',

    ],
    all: [
      './feature/MZ_001-singlePinUpload.feature',
      './feature/MZ_002-multiplePinUpload.feature',
      './feature/MZ_003-pinAndPlateUpload.feature',
      './feature/MZ_004-plateUpload.feature',
      './feature/MZ_005-screenOperations.feature',
      './feature/MZ_006-contentChecking.feature',
    ]
  },

  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //

  //
  // First, you can define how many instances should be started at the same time.
  // The property handles how many capabilities from the same test should run tests.
  //
  maxInstances: process.env.instance || 1,

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //

  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,

  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',

  //
  // Enables colors for log output.
  coloredLogs: true,

  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 60000,

  //
  // Default timeout in milliseconds for request if Selenium Grid doesn't send response
  connectionRetryTimeout: 60000,

  //
  // Default request retries count
  connectionRetryCount: 3,

  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['spec'],

  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: 'https://prs-origin-tst.meviy.misumi-ec.com',


  //
  // Some reporter require additional information which should get defined here
  // reporterOptions: {
  //   junit: {
  //     outputDir: './reports/'
  //   }
  // },
  reporters: ['allure','spec'],
  reporterOptions: {
    allure: {
      outputDir: 'allure-results'
    }
  },


  plugins: {
    'wdio-screenshot': {}
  },

  // Remove depreciation warnings
  deprecationWarnings: false,

  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  // services: ['sauce','appium','selenium-standalone'],
  //
  // services: ['selenium-standalone'],
  seleniumLogs: './reports/',
  // seleniumArgs: [{'version': '3.0.1'}, {'drivers.chrome.version': '2.27'}, {'drivers.chrome.arch': 'x64'}],

  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  framework: 'cucumber',

  cucumberOpts: {
    tags: require('./tagsProcessor')(process.argv),
    require: [
      './step_definitions/login.stepDefinition.js',
      './step_definitions/order.stepDefinition.js',
      './step_definitions/upload.stepDefinition.js',
      './step_definitions/project.stepDefinition.js',
      './step_definitions/email.stepDefinition.js',
      './step_definitions/managementLogin.stepDefinition.js',
      './step_definitions/qtProjectList.stepDefinition.js',
      './step_definitions/qtProject.stepDefinition.js',
      './step_definitions/soProjectList.stepDefinition.js',
      './step_definitions/soProject.stepDefinition.js'

    ],
    failFast: true,
    dryRun: false,
    colors: true,
    timeout: 500000
  },

  // params for storing global variables
  params: {
    projectPageUrl: null,
    fileName: null,
    initialPrice: null,
    totalPrice: null,
    qtProjectListId: null,
    pinAndPlatePrice: {
      part1: null,
      part2: null
    }
  },

  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  before: function (capabilities, specs) {
    /**
     * Initilaize global variables
     */
    browser.params = this.params;
    /**
     * Setup the Chai assertion framework
     */
    let chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    /**
     * Initialize utility functions
     */
    let utils = require('./utilities/utils');
    utils.init();
     /**
     * Configure viewport size
     */
    let size = {
      width: 1280,
      height: 600
    };
    browser.setViewportSize(size);

    console.log('Starting Test Case: -', specs[0].replace(/^.*[\\\/]/, ''));
  },

  onPrepare: function () {
    let fs = require('fs');
    if (!fs.existsSync(__dirname + '/reports/screenshots')) {
      if (!fs.existsSync(__dirname + '/reports')) {
        fs.mkdirSync(__dirname + '/reports');
      }
      fs.mkdirSync(__dirname + '/reports/screenshots');
    }
    const downloadPath = __dirname + '/data/downloads';
    if( fs.existsSync(downloadPath) ) {
      fs.readdirSync(downloadPath).forEach(function(file,index){
        if (file === '.gitignore') return;
        var curPath = downloadPath + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
    }
  },

  afterStep: function (step) {
    if (step.getStatus() === 'failed') {
      let stepName = step.getStep().getName();
      let featureName = step.getStep().getScenario().getFeature().getName();
      let screenShot = './reports/screenshots/' + new Date().getTime() + featureName + ' ' + stepName + '.png';
      console.log('Adding screenshot: ' + screenShot);
      browser.saveScreenshot(screenShot);
    }
  },

  afterFeature: function (feature) {
    browser.deleteCookie();
  },

  // params for storing global variables
  params: {
    projectPageUrl: null,
    fileName: null,
    modelNumber: null,
    initialPrice: null,
    totalPrice: null,
    qtProjectListId: null,
    pinAndPlatePrice: {
      part1: null,
      part2: null,
    }
  }

};
