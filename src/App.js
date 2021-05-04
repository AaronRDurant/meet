import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		currentLocation: 'all',
		alertText: '',
	};
	
	updateEvents = (location, eventCount) => {
		if (!navigator.onLine) {
			this.setState({
				alertText:
				"Please connect to the internet to ensure the events list is updated.",
			});
		} else {
			this.setState({ alertText: '' });
		}
		const { currentLocation, numberOfEvents } = this.state;
		if (location) {
			getEvents().then((events) => {
				const locationEvents =
				location === 'all'
				? events
				: events.filter((event) => event.location === location);
				const filteredEvents = locationEvents.slice(0, numberOfEvents);
				this.setState({
					events: filteredEvents,
					currentLocation: location,
				});
			});
		} else {
			getEvents().then((events) => {
				const locationEvents =
				currentLocation === 'all'
				? events
				: events.filter((event) => event.location === currentLocation);
				const filteredEvents = locationEvents.slice(0, eventCount);
				this.setState({
					events: filteredEvents,
					numberOfEvents: eventCount,
				});
			});
		}
	};
	
	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({
					events: events,
					locations: extractLocations(events),
				});
			}
		});
	}
	
	componentWillUnmount() {
		this.mounted = false;
	}
	
	render() {
		return (
			<div className='App'>
				<CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
				<NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
				<OfflineAlert text={this.state.alertText} />
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;