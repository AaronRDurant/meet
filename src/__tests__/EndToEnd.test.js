import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
	let browser, page;
	
	beforeAll(async () => {
		jest.setTimeout(120000);
		browser = await puppeteer.launch();
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
