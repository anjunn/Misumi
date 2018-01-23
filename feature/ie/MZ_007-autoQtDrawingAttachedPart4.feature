Feature: Scenario 7 Part 4

Scenario: Operator opens the order from SO page

Given Admin goes to management site
When Check if the login page of management site is shown
Then The correct credentials are given and log in
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
And Operator checks 3d view of each part from SO page for multiple pin