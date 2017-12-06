Feature: Check meviy.misumi-ec.com
Scenario: Test the Senario1 - Single Pin upload and order

Given User access sample 3D page
When User login to meviy
Then User lands in mypage url

Given Upload 3D data for pin
When User define quotation condition for the pin
Then Thumb nail of 3D appears

Given User Open the uploaded project
When Define quotation condition in parts view
