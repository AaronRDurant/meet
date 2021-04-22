Feature: Specify Number of events

Scenario: If user hasn’t specified a number of events, 32 is the default.
	Given the user did not specify a number of events being shown
	When the app is loaded
	Then 32 events are shown by default

  Scenario: User can change the number of events they want to see.
	Given the list of events is loaded and the user did not specify a number of events
	When the user specifies a number
	Then the app should load a maximum of that specified number of events
