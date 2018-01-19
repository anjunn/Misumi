Feature: Scenario 4 Part 3

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Validating Manual Quotation

Then User validates manual quotation icon and price in the listing screen
Then User opens the uploaded project
Then User check unit price and icon in parts view

Scenario: User places the order

Given User goes to order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page