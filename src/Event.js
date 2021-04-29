import React, { Component } from "react";

class Event extends Component {
  state = {
	event: {},
	showDetails: false
  };

  handleShowDetails = () => {
	if (this.state.showDetails === false) {
	  this.setState({ showDetails: true });
	} else {
	  this.setState({ showDetails: false });
	}
  };

  render() {
	const showDetails = this.state.showDetails;
	const { event } = this.props;

	return (
	  <div className="event">
		<div className="event-container">
		  <h2 className="event-title">{event.summary}</h2>
		  <p className="event-location">{event.location}</p>
		  <p className="event-date">{event.start.dateTime}</p>
		  {!showDetails && (
			<button className="details-button" onClick={this.handleShowDetails}>
			  Show Details
			</button>
		  )}
		  {showDetails && (
			<button className="details-button" onClick={this.handleShowDetails}>
			  Hide Details
			</button>
		  )}
		</div>
		{showDetails && (
		  <div className="event-details" id="eventDetails">
			<p className="description">{event.description}</p>
		  </div>
		)}
	  </div>
	);
  }
}
export default Event;