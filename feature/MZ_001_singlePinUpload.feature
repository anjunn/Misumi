Feature: Scenario 1

Scenario: Single Pin upload and order

Given User goes to Home Page
Then User validates the webpage header
Then User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
Then User validates Member ID field
And User validates Password field
Then User enters credentials and logs in

Given Upload 3D data for single pin
When Verify if upload is successfull for single pin
When User define quotation condition for the pin
Then Check if Thumb nail of 3D appears
When User verify project name and price for single pin

Given User Open the uploaded project
When User opens email
And User logins to mail account
Then User verify project details in the mail
And User goes back to project page

When User does Feature Recognition for single pin
Then User verify part names for single pin
Then Define quotation condition in parts view

Given User goes to order page single pin
Then Check if product name and order details is shown in order page for single pin
Then Place the order

When User is taken to the Thankyou page
Then Go to order history