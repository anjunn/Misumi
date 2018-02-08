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

# Given User uploads 3D data for single pin
# When User verifies whether upload is successful for single pin
Then Check different combination of quotations