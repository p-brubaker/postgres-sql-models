import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import mockFacilitiesRes from './facilities/mockFacilitiesRes.json';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('facilities routes', () => {
    const server = setupServer(
        rest.get(
            'https://ridb.recreation.gov/api/v1/facilities',
            (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(mockFacilitiesRes));
            }
        )
    );

    beforeAll(() => {
        server.listen({
            onUnhandledRequest: 'bypass',
        });
    });

    beforeEach(async () => {
        await setup(pool);
        const query = { city: 'Portland', state: 'Oregon', radius: 100 };
        await request(app).post('/api/facilities').send(query);
        const query2 = { city: 'Las Vegas', state: 'Nevada', radius: 100 };
        await request(app).post('/api/facilities').send(query2);
    });

    afterEach(() => server.resetHandlers);

    it('should save and return a facility within x miles of a given city', async () => {
        await setup(pool);
        const query = { city: 'Portland', state: 'Oregon', radius: 100 };
        const res = await request(app).post('/api/facilities').send(query);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                lat: expect.any(Number),
                long: expect.any(Number),
                description: expect.any(String),
            })
        );
    });

    it('should get a facility by id', async () => {
        const res = await request(app).get('/api/facilities/1');
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                lat: expect.any(Number),
                long: expect.any(Number),
                description: expect.any(String),
            })
        );
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
