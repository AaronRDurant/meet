import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32,
	}
	
	handleInputChanged = (event) => {
		const value = event.target.value;
		this.props.updateEvents(null, value);
		this.setState({
			numberOfEvents: value,
		});
		
		if (value < 1 || value > 32) {
			this.setState({
				infoText: 'Please choose between 1 and 32 events',
			});
		} else {
			this.setState({
				infoText: '',
			});
		}
	};
	
	render() {
		return (
			<div className='numberOfEventsAndAlert'>
				<ErrorAlert text={this.state.infoText} />
				<div className='number-of-events'>
					<label className='number-of-events-label'>Show me... </label>
					<input
						type='number'
						className='event-number-input'
						value={this.state.numberOfEvents}
						onChange={this.handleInputChanged}>
					</input>
				</div>
			</div>
		);
	}
}

export default NumberOfEvents;
