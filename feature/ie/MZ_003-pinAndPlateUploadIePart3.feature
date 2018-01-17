Feature: Scenario 3 Part 3

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
Then User validates the product name and order details in order page
And User places the order
And The Order is succesfully placed
And User goes to Order History Page