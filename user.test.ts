
import request from "supertest";

import dotenv from "dotenv";

dotenv.config();  // Load environment variables from .env file

const baseUrl = 'https://gorest.co.in/public/v2/';

const TOKEN = process.env.GOREST_BEARER_TOKEN;

describe('GET users', () => {
	it('should return a 200 status code when unauthenticated', async () => {
		const response = await request(baseUrl)
			.get('users');

		expect(response.statusCode).toBe(200);
	});
    it('should return a 200 status code when authenticated', async () => {
		const response = await request(baseUrl)
			.get('users')
            .set('Authorization', `Bearer ${TOKEN}`);

		expect(response.statusCode).toBe(200);
	});
    it('should return an individual user for valid user id', async () => {
		const response = await request(baseUrl)
			.get('users/6940141')
            .set('Authorization', `Bearer ${TOKEN}`);

		expect(response.statusCode).toBe(200);
	});
    it('should return a 404 status code for an unexisting user id', async () => {
		const response = await request(baseUrl)
			.get('users/1')
            .set('Authorization', `Bearer ${TOKEN}`);

		expect(response.statusCode).toBe(404);
	});
});

describe('POST users', () => {
	it('should return a 401 status code when unauthenticated', async () => {
		const response = await request(baseUrl)
			.post('users');

		expect(response.statusCode).toBe(401);
	});
    it('should return a 200 status code when authenticated', async () => {
		const response = await request(baseUrl)
			.get('users')
            .set('Authorization', `Bearer ${TOKEN}`);

		expect(response.statusCode).toBe(200);
	});
});