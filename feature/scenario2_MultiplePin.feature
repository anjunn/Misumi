Feature: Check meviy.misumi-ec.com
Scenario: Test the Senario1 - Single Pin upload and order

Given User access sample 3D page
When User login to meviy

Given Upload 3D data for multiple pin
When User define quotation condition for the multple pin
Then 3D Thumb nail of multiple pins appears

Given User Open the uploaded multiple pin project
When User check feature recognition
When User Check grouping
Then Place the order for the multiple pins

When User is taken to Thankyou page
Then Go to order history and check the product