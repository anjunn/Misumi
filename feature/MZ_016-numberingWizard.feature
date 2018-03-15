Feature: Scenario 16

Scenario: User logins to presentation site

Given User goes to Home Page
Then User validates the webpage header
And User validates the Start Right Away button
When User goes to Login Page
And User validates username field
And User validates Password field
And User enters credentials and logs in

Scenario: User checks the uploaded project

Given User uploads 3D data for pins
When User verifies whether upload is successful for pins
And User defines quotation condition for pins

Scenario: User checks the functioning of Input back numbering input

Given User opens the uploaded project
When User selects Input back numbering input
Then User fills the data for Input back numbering and confirms

When User verifies if the model number contains NHC-data in it 
Then User opens parts view of each item and view details like checkbox and textbox