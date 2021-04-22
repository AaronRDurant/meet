import React from 'react';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
	test('If user hasn’t specified a number of events, 32 is the default.', ({ given, when, then }) => {
		let AppWrapper;
		given('the user did not specify a number of events being shown', () => {
			
		});
		
		when('the app is loaded', () => {
			AppWrapper = mount(<App />);
		});
		
		then('32 events are shown by default', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(32);
		});
	});
	
	test('User can change the number of events they want to see.', ({ given, when, then }) => {
		let AppWrapper;
		given('the list of events is loaded and the user did not specify a number of events', () => {
			AppWrapper = mount(<App />);
		});
		
		when('the user specifies a number', () => {
			const numberOfEvents = { target: { value: 5 } };
			AppWrapper.find('.number-of-events').simulate('change', numberOfEvents);
		});
		
		then('the app should load a maximum of that specified number of events', () => {
			const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
			NumberOfEventsWrapper.setState({ numberOfEvents: 5 });
			expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(5);
		});
	});
});
