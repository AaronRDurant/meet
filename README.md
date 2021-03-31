# meet
meet is a serverless PWA that incorporates the Google Calendar API to fetch and display upcoming events. AWS is the cloud provider hosting the serverless function for this app, which was built with React using a test-driven development (TDD) approach.
## Check It Out 🤩
Currently, the app is accessible via [GitHub Pages](https://aaronrdurant.github.io/meet/). Alternatively, you can clone this repository and then...
### Install Dependencies
```bash
npm install
```
### Run in Browser
```bash
npm run start
```
### Run Tests
```bash
npm run test
```
---
## Features
Here are the user stories and scenarios that guided the construction of meet.
### 1. Filter Events by City
#### User Story:
- As a user, I should be able to filter events by city, so that I can see events taking place in certain cities.
#### Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
- _Given_ the user hasn't searched for any city
- _When_ the user opens the app
- _Then_ the user should see a list of all upcoming events
#### Scenario 2: User should see a list of suggestions upon searching for a city
- _Given_ the main page is open
- _When_ the user begins typing in the city text box
- _Then_ the user should see a list of suggested cities that match what they've entered
#### Scenario 3: User can select a city from list of suggestions
- _Given_ the user typed Detroit in the city text box and the list of suggested cities is showing
- _When_ the user selects a city from the list
- _Then_ their city should be changed to the selected one, and the user should receive a list of upcoming events in that city
### 2. Show/Hide Event Details
#### User Story:
- As a user, I should be able to click on an event, so that I can see more or less details about it.
#### Scenario 1: An event element is collapsed by default
- _Given_ the main page is showing events
- _When_ the user chooses a city
- _Then_ the user should be presented with a list of expandable events in that city
#### Scenario 2: User can expand an event to see its details
- _Given_ list of upcoming events is showing
- _When_ the user chooses an event
- _Then_ the chosen event expands to show more information
#### Scenario 3: User can collapse an event to hide details
- _Given_ the main page is displaying an expanded element
- _When_ the user clicks on the expanded event
- _Then_ the event collapses, hiding the additional information
### 3. Specify Number of Events
#### User Story:
- As a user, I should be able to select how many events I wish to have displayed, so that I can organize the page in a manner convenient for me.
#### Scenario 1: When user hasn't specified a number, 32 is the default
- _Given_ the main page is open
- _When_ the app is loaded
- _Then_ the app will display 32 events
#### Scenario 2: User can change the number of events they want to see
- _Given_ a list of upcoming events is displayed
- _When_ the user enters a number
- _Then_ the number of events displayed changes to match their input
### 4. Use App When Offline
#### User Story:
- As a user, I should be able to use the meet app while offline, so that I can revisit events I've already looked at even when away from an internet connection.
#### Scenario 1: Show cached data when there's no internet connection
- _Given_ the user isn't connected to the internet
- _When_ the user loads the app
- _Then_ the user is shown events in the city they last looked at
#### Scenario 2: Show error when user changes the settings (city, time range)
- _Given_ the user isn't connected to the internet and has the app open
- _When_ the user attempts to view uncached materials
- _Then_ an error is displayed
### 5. Data Visualization
#### User Story:
- As a user, I should be able to see a visualization of events in cities, so that I can easily see how many events are in certain cities.
#### Scenario 1: Show a chart with the number of upcoming events in each city
- _Given_ the main page is open
- _When_ the app is loaded
- _Then_ a chart is shown portraying the number of upcoming events in each city
---
## Author 👨‍💻
- Aaron Durant [@AaronRDurant](https://twitter.com/AaronRDurant)
