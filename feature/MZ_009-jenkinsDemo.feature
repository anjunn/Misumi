Feature: Scenario 9

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Single Pin upload

Given User uploads 3D data for single pin
When User verifies whether upload is successful for single pin
And User defines quotation condition for single pin
Then User checks whether thumb nail of 3D appears for single pin
And User verifies project details for single pin