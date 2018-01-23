Feature: Scenario 7 Part 2

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

Then Operator checks 3d view of project from QT page
And Operator verifies that order button is disabled when viewing from QT page
And Operator checks 3d view of each part from QT page for multiple pin