Feature: Pin and Plate

Scenario: Pin and Plate upload

Given User access sample 3D page
Then User is able to see the webpage header
And User is able to view Start Right away button
When User is at login page
Then User validates Member ID field
And User validates Password field
Then User enters Member Id and password

Given Upload 3D data for pin and plate
When Verify if upload is successfull for pin and plate
When User define quotation condition for the pin and plate
Then Check 3D Thumb nail of pin and plate appears
When User verify project name and price for pin and plate

Scenario: Email validation for pin and plate

Given User Open the uploaded project
When User opens email
And User logins to mail account
Then User verify project details in the mail
And User goes back to project page

Scenario: User request for manual quotation

When User check feature recognition for pin and plate
Then Define quotation condition in parts view for pin and plate
And User check the different parts name in parts view
And User request for manual quotation in parts view

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

Given Admin verifies product price and part names
When Admin sends mail to Tpro to get 2D data
Then Admin verifies if the send email pop up is shown and clicks ok
When Admin requests for quotation to supplier
Then Admin verifies if the send email pop up is shown and clicks ok
And Admin modifies the quotation after getting data from suppliers





