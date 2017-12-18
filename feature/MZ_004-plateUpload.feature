Feature: Scenario 4

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
Then User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
Then User validates username field
Then User validates Password field
Then User enters credentials and logs in

Scenario: 3D Data Upload

Given Upload 3D data for plate
When Verify if upload is successful for plate
When User define quotation condition for the plate
Then Check 3D Thumb nail of plate appears
When Click Continue to specify the Estimate condition button
Then User check feature recognition for plate

Scenario: Email validation after upload

Given User Open the uploaded project
When User opens email
And User logins to mail account
Then User verify project details in the mail
And User goes back to project page