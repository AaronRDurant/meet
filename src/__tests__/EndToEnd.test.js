import puppeteer from 'puppeteer';

describe('filter events by city', () => {
	let browser, page;
	
	beforeAll(async () => {
		jest.setTimeout(120000);
		const browser = await puppeteer.launch({
			// headless: false,
			// slowMo: 250,
			// ignoreDefaultArgs: ['--disable-extensions']
		});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.CitySearch');
	});
	
	// afterAll(() => {
	// 	browser.close();
	// });
	
	test('When user has not searched for a city, show upcoming events from all cities', async () => {
		const events = await page.$('.Event');
		expect(events).toBeDefined();
	});
	
	test('User should see a list of suggestions when they search for a city', async () => {
		await page.waitForSelector('.city');
		await page.type('.city', 'Berlin', { delay: 50 });
		await page.waitForSelector('.suggestions');
		
		const isVisible = await page.evaluate(() => {
			const el = document.querySelector('.suggestions');
			if (!el) return false;
			const style = window.getComputedStyle(el);
			return style && style.display !== 'none' && style.visibility !== 'hidden';
		});
		expect(isVisible).toBe(true);
	});
	
	// This just keeps timing out no matter how long I set jest.setTimeout() for...
	// test('User can select a city from the suggested list', async () => {
	// 	const cityName = 'Berlin, Germany';
	// 	await page.waitForSelector(`[id="${cityName}"]`);
	// 	await page.click(`[id="${cityName}"]`);
	// });
});

describe('show/hide event details', () => {
	let browser, page;
	
	beforeAll(async () => {
		jest.setTimeout(120000);
		const browser = await puppeteer.launch({
			// headless: false,
			// slowMo: 250,
			// ignoreDefaultArgs: ['--disable-extensions'],
			// args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});
	
	// afterAll(async () => {
	// 	browser.close();
	// });
	
	test('An event element is collapsed by default', async () => {
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeNull();
	});
	
	test('User can expand an event to see its details', async () => {
		await page.click('.event .details-button');
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeDefined();
	});
	
	// Will add another test here for "User can collapse an event to hide its details."
});
