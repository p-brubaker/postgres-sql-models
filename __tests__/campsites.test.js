import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
        setup(pool);
    });

    it('should save and return a campsite that is within x miles of a given city', async () => {
        const query = { city: 'Portland', state: 'Oregon', radius: 75 };
        const result = await request(app).post('/api/campsites').send(query);
        expect(result.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                lat: expect.any(Number),
                long: expect.any(Number),
            })
        );
    });

    afterAll(() => {
        pool.end();
    });
});
