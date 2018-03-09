Feature: Scenario 13

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
# And User defines quotation condition for single pin
# Then User checks whether thumb nail of 3D appears for single pin

Given User opens the uploaded project
Given User goes to order page
When User checks the checkbox and redirect wos page
Then User verifies if the quantity and model number in Order input page is same as shown in presentation

Given User clicks on the next button 
And User clicks the close button in the popup
When User verifies price,model number and quantity is shown in specify shipping date page
Then User clicks the next button in Specify shipping date page

Given User is in Order Confirmation page and verifies the product details
When User clicks next in Order Confirmation page
Then User gets the purchase order number from the Order Complete page 

Given User switches to presentation, and checks if he is in mypage 
