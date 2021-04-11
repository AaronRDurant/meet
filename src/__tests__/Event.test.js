import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { extractEvents } from '../api';
import { mockData } from '../mock-data';

const eventData = extractEvents(mockData);

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event event={eventData[0]} />);
	});
	
	test('render event component', () => {
		expect(EventWrapper).toHaveLength(1);
	});
	
	test('render event element', () => {
		expect(EventWrapper.find('.event')).toHaveLength(1);
	});
	
	test('render event container', () => {
		expect(EventWrapper.find('.event-container')).toHaveLength(1);
	});
	
	test('render event details', () => {
		EventWrapper.setState({ showDetails: true });
		expect(EventWrapper.find('.event-details')).toHaveLength(1);
	});
	
	test('render show/hide details button', () => {
		expect(EventWrapper.find('.details-button')).toHaveLength(1);
	});
	
	test('clicking on show details button should show event details', () => {
		EventWrapper.setState({ showDetails: false });
		EventWrapper.find('.details-button').simulate('click');
		expect(EventWrapper.state('showDetails')).toBe(true)
	});
	
	test('clicking on hide details button should hide event details', () => {
		EventWrapper.setState({ showDetails: true });
		EventWrapper.find('.details-button').simulate('click');
		expect(EventWrapper.state('showDetails')).toBe(false)
	});
});
