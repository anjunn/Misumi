Feature: Scenario 1

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
When User verifies project name and price after thumbnail appears

Scenario: Email validation after upload

Given User opens the uploaded project
And User decides to check the email
When User logs in to mail account
Then User verifies the project details in the mail
And User goes back to project page

Scenario: User checks the uploaded project

When User does Feature Recognition for single pin
Then User verifies part names for single pin
And User defines quotation condition in parts view for single pin

Scenario: User places the order

Given User goes to order page
Then User validates the product name and order details in order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page
