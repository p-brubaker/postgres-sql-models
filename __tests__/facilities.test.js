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
        const query2 = { city: 'Las Vegas', state: 'Nevada', radius: 200 };
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

    it('should get all facilities', async () => {
        const res = await request(app).get('/api/facilities');
        expect(res.body).toEqual(
            expect.arrayContaining([
                {
                    id: 1,
                    lat: expect.any(Number),
                    long: expect.any(Number),
                    description: expect.any(String),
                },
                {
                    id: 2,
                    lat: expect.any(Number),
                    long: expect.any(Number),
                    description: expect.any(String),
                },
            ])
        );
    });

    it('should update a facility by id', async () => {
        const res = await request(app).patch('/api/facilities/1').send({
            description: 'Updated description',
        });
        expect(res.body).toEqual({
            id: 1,
            lat: expect.any(Number),
            long: expect.any(Number),
            description: 'Updated description',
        });
    });

    it('should delete a facility by id', async () => {
        await request(app).delete('/api/facilities/1');
        const res = await request(app).get('/api/facilites');
        expect(res.body).toEqual(
            expect.arrayContaining([
                {
                    id: 2,
                    lat: expect.any(Number),
                    long: expect.any(Number),
                    description: expect.any(String),
                },
            ])
        );
        expect(res.body.length).toEqual(1);
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
