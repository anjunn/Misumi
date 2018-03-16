Feature: Scenario 14

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: User checks project listing style and sort order

When Check project list style by changing to list view and then grid view
Then Check project counts displayed in the upload screen
Then Check sort order of Date in ascending and then in descending
Then Check sort order of Price in ascending and then in descending
