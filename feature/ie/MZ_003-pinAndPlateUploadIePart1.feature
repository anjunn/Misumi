Feature: Scenario 3 Part 1

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Pin and Plate upload

Given User uploads 3D data for pin and plate
When User verifies whether upload is successful for pin and plate
And User defines quotation condition for pin and plate
Then User checks whether thumb nail of 3D appears for pin and plate
And User verifies project details for pin and plate
Given User opens the uploaded project

Scenario: User request for manual quotation

When User does Feature Recognition for pin and plate
Then User defines quotation condition in parts view for pin and plate
And User verifies part names for pin and plate
And User request for manual quotation in parts view for pin and plate