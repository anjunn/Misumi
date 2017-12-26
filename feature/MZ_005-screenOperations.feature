Feature: Scenario 5

Scenario: User logins to presentation site

Given User goes to Home Page
When User goes to Login Page
Then User is redirected to Login Page
And User enters credentials and logs in

Scenario: Multiple Pin upload

Given User uploads 3D data for multiple pin from dialog
When User verifies whether upload is successful for multiple pin
And User defines quotation condition for multiple pin
Then User checks whether thumb nail of 3D appears for multiple pin
When User verifies project name and price after thumbnail appears
Given User opens the uploaded project

Scenario: Check Selects a part

When User selects a part by product type and selects Core pins
Then Check if all core pins are selected and finally deselect

Scenario: Check Parts filter 

When User selects filter and take CorePin
Then User verifies if filter has been proper
And User does Feature Recognition for core pin

Scenario: User checks customer input number

When User gives Customer ordering number manually
When User gives Customer ordering number batch input 
When User verifies Customer ordering number batch input
Then User resets the batch input
When User gives Customer ordering number using input wizard
Then User verifies Customer ordering number using input wizard

Scenario: Define quotation condition in parts viewe - change material

When User selects a part and changes the material
Then User updates the quotation and verifies the change