Feature: Scenario 7

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Multiple Pin upload

Given User uploads 3D data for multiple pin
When User verifies whether upload is successful for multiple pin
And User defines quotation condition for multiple pin
Then User checks whether thumb nail of 3D appears for multiple pin
When User verifies project name and price after thumbnail appears

Scenario: Email validation after upload

Given User opens the uploaded project
And User decides to check the email
When User logs in to mail account
Then User verifies the project details in the mail
And User goes back to project page

Scenario: User checks the uploaded project

When User does Feature Recognition for multiple pin
Then User defines quotation condition in parts view for multiple pin
And User verifies part names for multiple pin
And User checks grouping
#Given User opens the uploaded project
Then Takes model number from presentation

Scenario: Operator login to management site

Given Admin goes to management site
When Check if the login page of management site is shown
Then The correct credentials are given and log in

Scenario: Operator opens the order from qt page and verifies part prices and part names


When Admin searches the uploaded file in QT project list
And Verifies if order status and color is displayed correctly
Then Opens the file uploaded by the user from QT project list
And Admin verifies product price and part names for multiple pin


Scenario: Sending mail to TPro and Supplier

When Admin sends mail to Tpro to get 2D data for multiple pin
Then Admin verifies if the send email pop up is shown and clicks ok
When Admin requests for quotation to supplier
Then Admin verifies if the send email pop up is shown and clicks ok

Scenario: QT List and status checking 

Then Admin verifies the operation status for the item
Then Operator checks product part number from QT for multiple pin

Scenario: 3D Viewer Project view  management QT 

Scenario: User places the order

Given User goes to my page 
Then User opens the uploaded project
Given User goes to order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page

Scenario: Operator opens the order from SO page

Given Admin goes to management site
And Admin navigates to SO section in management site 
Then Admin searches the uploaded file in SO project list
And Verifies if the status and colour is displayed correctly in SO page
Then Opens the file uploaded by the user from SO project list
Then Operator verifies the operation status for multiple pin
Then Operator checks product details in from SO for multiple pin

Scenario: Operator sends mail to supplier
Given Admin selects the supplier from so page
Then Admin sends email to the supplier
And Admin verifies if the send email pop up is shown and clicks ok in SO page

Scenario: 3D Viewer Project view in management SO 
