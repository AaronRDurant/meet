import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32,
	}
	
	handleInputChanged = (event) => {
		const value = event.target.value;
		this.setState({
			numberOfEvents: value
		});
		this.props.updateEvents(null, value);
	}
	
	render() {
		return (
			<div className='number-of-events'>
				<label className='number-of-events-label'>How many events to show? </label>
				<input
					type="number"
					className="event-number-input"
					value={this.state.numberOfEvents}
					onChange={this.handleInputChanged}>
				</input>
			</div>
		);
	}
}

export default NumberOfEvents;
