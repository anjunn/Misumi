Feature: Scenario 3 Part 4

Scenario: Operator opens the order from SO page

Given Admin goes to management site
And Admin navigates to SO section in management site
Then Admin searches the uploaded file in SO project list
And Admin selects the person in charge for the uploaded project in SO page
Then Admin verifies if the selected person in charge is displayed in SO page
And Verifies if the status and colour is displayed correctly in SO page
And Opens the file uploaded by the user from SO project list


Scenario: Operator opens the user uploaded project

Given Admin selects the supplier from so page
Then Admin sends email to the supplier
And Admin verifies if the send email pop up is shown and clicks ok in SO page