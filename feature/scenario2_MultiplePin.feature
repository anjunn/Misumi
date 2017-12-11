Feature: Scenario 2

	Scenario: Multiple Pin upload, grouping and place order


		Given User access sample 3D page
		When User login to meviy

		Given Upload 3D data for multiple pin
		When Verify if upload is successfull for multiple pin
		When User define quotation condition for the multple pin
		Then Check 3D Thumb nail of multiple pins appears
		When User verify project name and price for multiple pin

		Given User Open the uploaded multiple pin project
		When User check feature recognition
		When Define quotation condition in parts view for multiple pin
		When User Check grouping
		When User verify if product total and procced to order button is enabled for multiple pin
		Then Check if product name and order details is shown in order page for multiple pin
		Then Place the order for the multiple pins

		When User is taken to Thankyou page
		Then Go to order history and check the product