Feature: Scenario 4 Part 1

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Plate upload

Given User uploads 3D data for plate
When User verifies whether upload is successful for plate
And User defines quotation condition for plate
Then User checks whether thumb nail of 3D appears for plate
And User verifies project details for plate
Given User opens the uploaded project

Scenario: User request for manual quotation

When User does Feature Recognition for plate
And User verifies part names for plate
And User request for manual quotation in parts view for plate