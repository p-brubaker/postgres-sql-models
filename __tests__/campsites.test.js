import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import mockCampsiteData from './mockCampsitesRes.json';
import 'whatwg-fetch';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('demo routes', () => {
    const server = setupServer(
        rest.get(
            'https://ridb.recreation.gov/api/v1/campsites',
            (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(mockCampsiteData));
            }
        )
    );

    beforeAll(() => server.listen());
    beforeEach(() => {
        setup(pool);
    });
    afterEach(() => server.resetHandlers());

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

    it('should get all campsites in the database', async () => {
        await request(app)
            .post('/api/campsites')
            .send({ city: 'Seattle', state: 'Washington', radius: 75 })
            .then(async () => {
                await request(app).post('/api/campsites').send({
                    city: 'Austin',
                    state: 'Texas',
                    radius: 75,
                });
            });
        const result = await request(app).get('/api/campsites');
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    lat: expect.any(Number),
                    long: expect.any(Number),
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    lat: expect.any(Number),
                    long: expect.any(Number),
                }),
            ])
        );
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
