Feature: Check meviy.misumi-ec.com
Scenario: Test the Senario2 - Multiple Pin upload and order

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

Given User Open the uploaded multiple pin project
When User check feature recognition
When Define quotation condition in parts view for multiple pin
When User Check grouping
When User verify if product total and procced to order button is enabled for multiple pin
Then Place the order for the multiple pins

