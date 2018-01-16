Feature: Scenario 2

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
And User verifies project details for multiple pin

Scenario: Email validation after upload

Given User opens the uploaded project
And User decides to check the email
When User logs in to mail account
Then User selects the product estimate mail
And User goes back to project page

Scenario: User checks the uploaded project

When User does Feature Recognition for multiple pin
Then User defines quotation condition in parts view for multiple pin
And User verifies part names for multiple pin
And User checks grouping

Scenario: User places the order

Given User goes to order page
Then User validates the product name and order details in order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page

Scenario: Email validation after ordering

Given User decides to check the email
When User logs in to mail account
Then User selects the product order mail