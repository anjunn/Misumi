Feature: Scenario 10

Scenario: User logins to presentation site

Given User goes to Home Page of lab site
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: User checks the uploaded project

Given User uploads 3D data for single pin
When User verifies whether upload is successful for single pin
When Check Material To Surfacetreatment combinations in site with the same from the Excel sheet
Then Check Surfacetreatment To Material combinations in site with the same from the Excel sheet
Then Refresh the page
Given User uploads 3D data for single pin
And User defines quotation condition for single pin
Then User clicks on the thumbnail after uploading
Given User checks if the surface tension listed matches with the material selected
Then User checks if the material listed matches with the surface tension selected
