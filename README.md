# Meviy QA Automation

> OS- Windows 10

## Prerequisite
Download the following:
* Node Version- 8.7
  > https://nodejs.org/en/
  > https://nodejs.org/download/release/v8.7.0/node-v8.7.0-x64.msi
* Java- 9.X
  > http://download.oracle.com/otn-pub/java/jdk/9.0.1+11/jdk-9.0.1_windows-x64_bin.exe
* Chrome- 63.XX
* WebdriverIO (Install using `npm install webdriverio`)
  > http://webdriver.io/
* Visual Studio 2015
  > http://download.microsoft.com/download/7/2/E/72E0F986-D247-4289-B9DC-C4FB07374894/wdexpress_full.exe 
* Python 2.7 (v3.x.x is not supported)
  > https://www.python.org/downloads/
* Set the environment variable path for python
    System properties --> Environment variables
    --> Edit System variables --> Set C:\Python27

## Steps for executing the QA Automation test :

* Checkout the latest code from Develop branch of github
* Run the command `npm install`
* Go to the project location and install webdriver using the command `npm run webdriver-install`
* Start webdriver using the command `npm run webdriver-start`

>  Open another terminal for executing the test, commands are listed below

## Running the test cases in chrome

* For running all Scenarios: npm run test-ci-chrome
* For running scenario 1: npm run test-ci-selected --selected=001
* For running scenario 2: npm run test-ci-selected --selected=002
* For running scenario 3: npm run test-ci-selected --selected=003
* For running scenario 4: npm run test-ci-selected --selected=004
* For running scenario 5: npm run test-ci-selected --selected=005 
* For running scenario 6: npm run test-ci-selected --selected=006
* For running scenario 7: npm run test-ci-selected --selected=007

## Running the test cases in chrome for different environments

* For running in tst: npm run test-ci-selected --selected=001 --env=tst
'tst' is the default environment when running without env command
* For running in stg: npm run test-ci-selected --selected=001 --env=stg
* For running in dvl: npm run test-ci-selected --selected=001 --env=dvl
* For running in lab: npm run test-ci-selected --selected=001 --env=lab


## Running the test cases in ie

* Setup security settings in IE:
    => Take Tools of IE > Select Internet options > Take security tab > Enable protected mode for all zones.
* Also need to enable ‘64 bit processes for Enhanced Protected Mode’:
    => Take Tools of IE > Select Internet options > Take advanced  tab > Check the checkbox for “64 bit processes for Enhanced Protected Mode” under Security
* Run commands for IE
  * For running scenario 1: npm run test-ci-s1-ie
  * For running scenario 2: npm run test-ci-s2-ie
  * For running scenario 5: npm run test-ci-s5-ie

## Reports using allure: :

* Install allure `npm install wdio-allure-reporter --save-dev`

> For windows- Execute the following commands

 `Set-ExecutionPolicy RemoteSigned -scope CurrentUser`
 `iex (new-object net.webclient).downloadstring('https://get.scoop.sh')`
 `scoop install allure`

> Reference: https://docs.qameta.io/allure/latest/

## Generating report:

* Generating allure report using the command (in project folder)  `allure serve`

 

 

