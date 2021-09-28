import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
        setup(pool);
    });

    it('should return and save a campsite that is within x miles of a given city', async () => {
        const query = { city: 'Portland', state: 'Oregon', radius: 50 };
        const result = await request(app).post('/api/v1/campsites').send(query);
        expect(result.body).toEqual({
            id: expect.any(String),
            campsiteName: expect.any(String),
            typeOfUse: expect.any(String),
            lat: expect.any(Number),
            long: expect.any(Number),
        });
    });

    afterAll(() => {
        pool.end();
    });
});
