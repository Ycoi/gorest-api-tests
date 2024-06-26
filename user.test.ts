
import request from "supertest";

const baseUrl = 'https://gorest.co.in/public/v2/';

const TOKEN = 'd3f371aaa034260691246bd2b4f338b11de4c3d11043a4cdf4a088eca089556f';

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
			.get('users/6940140')
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
