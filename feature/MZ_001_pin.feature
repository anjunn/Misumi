Feature: Scenario 1

Scenario: Single Pin upload and order

Given User access sample 3D page
Then User is able to see the webpage header
And User is able to view Start Right away button
When User is at login page
Then User validates Member ID field
And User validates Password field
Then User enters Member Id and password

Given Upload 3D data for pin
When Verify if upload is successfull for single pin
When User define quotation condition for the pin
Then Check if Thumb nail of 3D appears
When User verify project name and price for single pin

Given User Open the uploaded project
When User does Feature Recognition for single pin
Then User verify part names for single pin
Then Define quotation condition in parts view

Given User goes to order page single pin
Then Check if product name and order details is shown in order page for single pin
Then Place the order

When User is taken to the Thankyou page
Then Go to order history