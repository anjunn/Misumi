Feature: Scenario: Smoke Test

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
Then User is redirected to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: Multiple Pin upload for checking auto quotation process

Given User uploads 3D data for multiple pin
When User verifies whether upload is successful for multiple pin
And User defines quotation condition for multiple pin
Then User checks whether thumb nail of 3D appears for multiple pin
And User verifies project details for multiple pin
Given User opens the uploaded project
And Takes model number from presentation for multiple pin

Scenario: Email validation after upload

And User decides to check the email
When User logs in to mail account
Then User selects the product estimate mail
And User verifies the product details in estimate mail
And User goes back to project page

Scenario: User checks the uploaded project

When User does Feature Recognition for multiple pin
Then User defines quotation condition in parts view for multiple pin
And User verifies part names for multiple pin
And User checks grouping

Scenario: Operator login to management site

Given Admin goes to management site
When Check if the login page of management site is shown
Then The correct credentials are given and log in

Scenario: Operator opens the order from QT and verifies part prices and part names

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

Then Operator checks 3d view of project from QT page
And Operator verifies that order button is disabled when viewing from QT page
And Operator checks 3d view of each part from QT page for multiple pin

Scenario: User places the order

Given User goes to my page
Then User opens the uploaded project
Given User goes to order page
Then User validates the product name and order details in order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page

Scenario: Email validation after ordering

Given User decides to check the email
When User logs in to mail account
Then User selects the product order mail

Scenario: Operator opens the order from SO page

Given Admin goes to management site
And Admin navigates to SO section in management site
Then Admin searches the uploaded file in SO project list
Then Opens the file uploaded by the user from SO project list
Then Operator verifies the operation status for multiple pin
Then Operator checks product details in from SO for multiple pin

Scenario: Operator sends mail to supplier

Given Admin selects the supplier from so page
Then Admin sends email to the supplier
And Admin verifies if the send email pop up is shown and clicks ok in SO page

Scenario: 3D Viewer Project view in management SO

Then Operator checks 3d view of project from SO page
And Operator verifies that order button is disabled when viewing from SO page

Scenario: Pin and Plate upload for checking manual quotation process

Given User goes to my page
Given User uploads 3D data for pin and plate
And User defines quotation condition for pin and plate
Given User opens the uploaded project

Scenario: User request for manual quotation

Then User defines quotation condition in parts view for pin and plate
And User verifies part names for pin and plate
And User request for manual quotation in parts view for pin and plate

Scenario: Operator goes to management site

Given Admin goes to management site

Scenario: Opens the order from QT for setting person in charge and to proceed to manual quotation

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
And Admin sends mail to customer for pin and plate

Scenario: Email validation after quotation

Given User decides to check the email
When User logs in to mail account
Then User selects the product quotation mail

Scenario: User goes to presentation site

Given User goes to my page

Scenario: User validates manual quotation

Then User validates manual quotation icon and price in the listing screen
Then User opens the uploaded project
Then User check unit price and icon in parts view

Scenario: User downloads and verifies pdf and csv files

Then User downloads the pdf
And User downloads the csv
And User validates contents of pdf file for pin and plate
And User validates contents of csv file

Scenario: User places the order

Given User goes to order page
And User places the order
And The Order is succesfully placed

Scenario: Operator opens the order from SO page

Given Admin goes to management site
And Admin navigates to SO section in management site
Then Admin searches the uploaded file in SO project list
And Admin selects the person in charge for the uploaded project in SO page
Then Admin verifies if the selected person in charge is displayed in SO page
And Verifies if the status and colour is displayed correctly in SO page

