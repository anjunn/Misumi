Feature: Scenario 3

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Pin and Plate upload

Given User uploads 3D data for pin and plate
When User verifies whether upload is successful for pin and plate
And User defines quotation condition for pin and plate
Then User checks whether thumb nail of 3D appears for pin and plate
When User verifies project name and price after thumbnail appears

Scenario: Email validation after upload

Given User opens the uploaded project
And User decides to check the email
When User logs in to mail account
Then User verifies the project details in the mail
And User goes back to project page

Scenario: User request for manual quotation

When User does Feature Recognition for pin and plate
Then User defines quotation condition in parts view for pin and plate
And User verifies part names for pin and plate
And User request for manual quotation in parts view for pin and plate

Scenario: Operator login to management site

Given Admin goes to management site
When Check if the login page of management site is shown
Then The correct credentials are given and log in

Scenario: Operator opens the order from qt page

When Admin searches the uploaded file in QT project list
And Admin selects the person in charge for the uploaded project
Then Admin verifies if the selected person in charge is displayed
And Verifies if order status and color is displayed correctly
And Opens the file uploaded by the user to proceed to manual quotation

Scenario: Operator does manual quotation

Given Admin verifies product price and part names for pin and plate
When Admin sends mail to Tpro to get 2D data for pin and plate
Then Admin verifies if the send email pop up is shown and clicks ok
When Admin requests for quotation to supplier
Then Admin verifies if the send email pop up is shown and clicks ok
And Admin modifies the quotation after getting data from suppliers for pin and plate

Scenario: User goes to presentation site

Given User goes to my page 

Scenario: User validates manual quotation 

Then User validates manual quotation icon and price in the listing screen
Then User opens the uploaded project
Then User check unit price and icon in parts view

Scenario: User downloads and verifies pdf and csv files

Then User downloads the pdf
And User downloads the csv

Scenario: User places the order

Given User goes to order page
Then User validates the product name and order details in order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page




