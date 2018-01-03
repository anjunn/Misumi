# Meviy QA Automation

> OS- Windows 10


## Prerequisite

* Node Version- 8.7
* Java- 9.X
* Chrome- 63.XX
* WebdriverIO (Install using `npm install webdriverio`)

> References: 
* https://nodejs.org/en/
* http://webdriver.io/


## Steps for executing the QA Automation test :

* Checkout the latest code from Develop branch of github
* Run the command `npm install`
* Go to the project location and install webdriver using the command `npm run webdriver-install`
* Start webdriver using the command `npm run webdriver-start`


>  Open another terminal for executing the test, commands are listed below

* For running all Scenarios :`npm run test-ci`
* For running scenario 1  :  `npm run test-s1`
* For running scenario 2  :  `npm run test-s2`
* For running scenario 3  :  `npm run test-s3`
* For running scenario 4  :  `npm run test-s4`
* For running scenario 5  :  `npm run test-s5`

## Reports using allure: :


* Install allure `npm install wdio-allure-reporter --save-dev`

> For windows- Execute the following commands


 `Set-ExecutionPolicy RemoteSigned -scope CurrentUser`
 `iex (new-object net.webclient).downloadstring('https://get.scoop.sh')`
 `scoop install allure`


> Reference: https://docs.qameta.io/allure/latest/


## Generating report:


* Generating allure report using the command (in project folder)  `allure serve`



