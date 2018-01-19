Feature: Scenario 7 part 1

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Multiple Pin upload

Given User uploads 3D data for multiple pin
When User verifies whether upload is successful for multiple pin
And User defines quotation condition for multiple pin
Then User checks whether thumb nail of 3D appears for multiple pin
And User verifies project details for single pin

Scenario: User checks the uploaded project

When User does Feature Recognition for multiple pin
Then User defines quotation condition in parts view for multiple pin
And User verifies part names for multiple pin
And User checks grouping
