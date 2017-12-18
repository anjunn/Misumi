Feature: Scenario 1

Scenario: Single Pin upload and order

Given User goes to Home Page
Then User validates the webpage header
Then User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
Then User validates username field
Then User validates Password field
Then User enters credentials and logs in

Given User uploads 3D data for single pin
When User verifies whether upload is successful for single pin
When User defines quotation condition for single pin
Then User checks whether thumb nail of 3D appears for single pin
When User verifies project name and price for single pin

Given User opens the uploaded project
When User decides to check the email
And User logs in to mail account
Then User verifies the project details in the mail
And User goes back to project page

When User does Feature Recognition for single pin
Then User verifies part names for single pin
Then User defines quotation condition in parts view for single pin

Given User goes to order page
Then User validates the product name and order details in order page
Then User places the order

Then The Order is succesfully placed
Then User goes to Order History Page
