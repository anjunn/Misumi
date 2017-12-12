Feature: Check meviy.misumi-ec.com
Scenario: Test the Senario1 - Single Pin upload and order

Given User access sample 3D page
When User login to meviy

Given Upload 3D data for pin
When Verify if upload is successfull for single pin
When User define quotation condition for the pin
Then Check if Thumb nail of 3D appears

When User verify project name and price for single pin

Given User Open the uploaded project
When User does Feature Recognition for single pin
When Define quotation condition in parts view
When Verify if quotation condition has been properly inputed
When User verify if product total and procced to order button is enabled for single pin
Then Place the order

When User is taken to the Thankyou page
Then Go to order history