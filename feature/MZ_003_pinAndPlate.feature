Feature: Scenario3

Scenario: Plate/Pin and Plate upload and order

Given User access sample 3D page
Then User is able to see the webpage header
And User is able to view Start Right away button
When User is at login page
Then User validates Member ID field
And User validates Password field
Then User enters Member Id and password

Given Upload 3D data for plate
When Verify if upload is successful for plate
When User define quotation condition for the plate
Then Check 3D Thumb nail of plate appears
When Click Continue to specify the Estimate condition button
Then User check feature recognition for plate

Given Upload 3D data for pin and plate
When Verify if upload is successfull for pin and plate
When User define quotation condition for the pin and plate
Then Check 3D Thumb nail of pin and plate appears
When User verify project name and price for pin and plate

Given User Open the uploaded pin and plate project
When User check feature recognition for pin and plate





