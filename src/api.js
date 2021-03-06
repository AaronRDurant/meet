import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

// Data retrieval
const getEvents = async () => {
	NProgress.start();
	
	// Return mockData for local user
	if (window.location.href.startsWith('http://localhost')) {
		NProgress.done();
		return { events: mockData, locations: extractLocations(mockData) };
	}
	
	// Returns cached data for offline user
	if (!navigator.onLine) {
		const events = localStorage.getItem('lastEvents');
		NProgress.done();
		return {
			events: JSON.parse(events).events,
			locations: extractLocations(JSON.parse(events).events),
		}
	}
	
	// Calls API to retrieve events data
	const token = await getAccessToken();
	let locations = null;
	if (token) {
		removeQuery();
		const url = 'https://nusdmtfcm3.execute-api.us-east-2.amazonaws.com/dev/api/get-events' +
			'/' +
			token;
		const result = await axios.get(url);
		if (result.data) {
			locations = extractLocations(result.data.events);
			localStorage.setItem('lastEvents', JSON.stringify(result.data));
			localStorage.setItem('locations', JSON.stringify(locations));
		}
		NProgress.done();
		return { events: result.data.events, locations };
	}
}

const extractLocations = (events = [] ) => {
	const extractLocations = events.map(event => event.location);
	return [...new Set(extractLocations)];
}

// Authentication and authorization
const getAccessToken = async () => {
	// Looks for pre-existing token in storage and checks validity
	const accessToken = localStorage.getItem('access_token');
	const tokenCheck = accessToken && (await checkToken(accessToken));
	
	// If no token or invalid token, retrieves new token through Google auth
	if (!accessToken || !tokenCheck) {
		localStorage.removeItem('access_token')
		
		// Looks for authorization code
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		
		// If no auth code, redirects to Google Auth to sign in and retrieve code
		if (!code) {
			const results = await axios.get(
				'https://nusdmtfcm3.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url'
			)
			const { authUrl } = results.data;
			return (window.location.href = authUrl);
		}
		return code && getToken(code);
	}
	return accessToken;
}

// Checks validity of access token
const checkToken = async (accessToken) => {
	const result = await fetch(
		`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
	)
	.then((res) => res.json())
	.catch((error) => error.json());
	
	return !result.error;
}

// Gets new token from AWS Lambda if no token or invalid token
const getToken = async (code) => {
	removeQuery();
	const encodeCode = encodeURIComponent(code);
	const { access_token } = await fetch(
		`https://nusdmtfcm3.execute-api.us-east-2.amazonaws.com/dev/api/token/${encodeCode}`
	)
	.then((res) => {
		return res.json();
	})
	.catch((error) => error);
	
	access_token && localStorage.setItem('access_token', access_token);
	
	return access_token;
}

// Removes code from URL after use
const removeQuery = () => {
	let newUrl;
	if (window.history.pushState && window.location.pathname) {
		newUrl =
			window.location.protocol +
			'//' +
			window.location.host +
			window.location.pathname
			window.history.pushState('', '', newUrl);
	} else {
		newUrl = window.location.protocol + '//' + window.location.host;
		window.history.pushState('', '', newUrl);
	}
}

export {
	getEvents,
	getAccessToken,
	extractLocations,
	removeQuery,
	checkToken,
	getToken,
}
