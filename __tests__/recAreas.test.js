import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import mockRecAreasRes from './recareas/mockRecAreasRes.json';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('Rec Area routes', () => {
    const server = setupServer(
        rest.get(
            'https://ridb.recreation.gov/api/v1/recareas',
            (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(mockRecAreasRes));
            }
        )
    );

    beforeAll(() =>
        server.listen({
            onUnhandledRequest: 'bypass',
        })
    );

    afterEach(() => server.resetHandlers());

    it('should save and return a recarea that is within x miles of a given city', async () => {
        await setup(pool);
        const query = { city: 'Portland', state: 'Oregon', radius: 150 };
        const result = await request(app).post('/api/recareas').send(query);
        expect(result.body).toEqual(
            expect.objectContaining({
                id: 1,
                lat: expect.any(Number),
                long: expect.any(Number),
                recAreaName: expect.any(String),
                recAreaDescription: expect.any(String),
                recAreaDirections: expect.any(String),
            })
        );
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
