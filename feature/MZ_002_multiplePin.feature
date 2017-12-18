Feature: Scenario2

Scenario: Upload multiple pin file

Given User access sample 3D page
Then User is able to see the webpage header
And User is able to view Start Right away button
When User is at login page
Then User validates Member ID field
And User validates Password field
Then User enters Member Id and password

Given Upload 3D data for multiple pin
When Verify if upload is successfull for multiple pin
When User define quotation condition for the multple pin
Then Check 3D Thumb nail of multiple pins appears
When User verify project name and price for multiple pin

Scenario: Email validation for multiple pin

Given User Open the uploaded project
When User opens email
And User logins to mail account
Then User verify project details in the mail
And User goes back to project page

Scenario: Feature recognition and order product for multiple pin

When User check feature recognition
Then Define quotation condition in parts view for multiple pin
Then User verify part names for multiple pin
Then User Check grouping

Given User goes to order page of multiple pin
Then Check if product name and order details is shown in order page for multiple pin
Then Place the order for the multiple pins

