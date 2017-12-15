Feature: Scenario 2

Scenario: Multiple Pin upload and order

Given User goes to Home Page
Then User validates the webpage header
Then User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
Then User validates username field
Then User validates Password field
Then User enters credentials and logs in

Given User uploads 3D data for multiple pin
When User verifies whether upload is successful for multiple pin
When User defines quotation condition for multiple pin
Then User checks whether thumb nail of 3D appears for multiple pin
When User verifies project name and price for multiple pin

Given User opens the uploaded project
When User decides to check the email
And User logs in to mail account
Then User verifies the project details in the mail
And User goes back to project page

When User does Feature Recognition for multiple pin
Then User defines quotation condition in parts view for multiple pin
Then User verifies part names for multiple pin
Then User checks grouping

Given User goes to order page
Then User validates the product name and order details in order page
Then User places the order

Then The Order is succesfully placed
Then User goes to Order History Page
