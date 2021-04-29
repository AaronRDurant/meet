import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
	const extractLocations = events.map((event) => event.location);
	return [...new Set(extractLocations)];
};

export const extractEvents = (events) => {
	const extractEvents = events.map((event) => event);
	return [...new Set(extractEvents)];
};

const checkToken = async (accessToken) => {
	return await fetch(
		`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
	)
	.then((res) => res.json())
	.catch((error) => error.json());
};

export const getEvents = async () => {
	NProgress.start();

	if (window.location.href.startsWith('http://localhost')) {
		NProgress.done();
		return mockData;
	}

	const token = await getAccessToken();

	if (token) {
		removeQuery();
		const url =
		'https://nusdmtfcm3.execute-api.us-east-2.amazonaws.com/dev/api/get-events' +
		'/' +
		token
		const result = await axios.get(url);
		if (result.data) {
<<<<<<< Updated upstream
			const locations = extractLocations(result.data.events);
			localStorage.setItem("lastEvents", JSON.stringify(result.data));
			localStorage.setItem("locations", JSON.stringify(locations));
=======
			var locations = extractLocations(result.data.events);
			localStorage.setItem('lastEvents', JSON.stringify(result.data));
			localStorage.setItem('locations', JSON.stringify(locations));
>>>>>>> Stashed changes
		}
		NProgress.done();
		return result.data.events;
	}
};

export const getAccessToken = async () => {
	const accessToken = localStorage.getItem('access_token');
	const tokenCheck = accessToken && (await checkToken(accessToken));

	if (!accessToken || tokenCheck.error) {
		await localStorage.removeItem('access_token');
		const searchParams = new URLSearchParams(window.location.search);
		const code = await searchParams.get('code');
		if (!code) {
			const results = await axios.get(
				'https://nusdmtfcm3.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url'
			);
			const { authUrl } = results.data;
			return (window.location.href = authUrl);
		}
		return code && getToken(code);
	}
	
	return accessToken;
};

const removeQuery = () => {
	if (window.history.pushState && window.location.pathname) {
<<<<<<< Updated upstream
		let newUrl =
			window.location.protocol +
			"//" +
			window.location.host +
			window.location.pathname;
		window.history.pushState("", "", newUrl);
	} else {
		let newUrl = window.location.protocol + "//" + window.location.host;
		window.history.pushState("", "", newUrl);
=======
		var newurl =
		window.location.protocol +
		'//' +
		window.location.host +
		window.location.pathname;
		window.history.pushState('', '', newurl);
	} else {
		newurl = window.location.protocol + '//' + window.location.host;
		window.history.pushState('', '', newurl);
>>>>>>> Stashed changes
	}
};

const getToken = async (code) => {
	const encodeCode = encodeURIComponent(code);
	const { access_token } = await fetch(
		`https://nusdmtfcm3.execute-api.us-east-2.amazonaws.com/dev/api/token/${encodeCode}`
	)
	.then((res) => {
		return res.json();
	})
	.catch((error) => error);
<<<<<<< Updated upstream

	access_token && localStorage.setItem("access_token", access_token);

=======
	
	access_token && localStorage.setItem('access_token', access_token);
	
>>>>>>> Stashed changes
	return access_token;
};
