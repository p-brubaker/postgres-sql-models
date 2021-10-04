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

    it('should get all recareas in the database', async () => {
        await setup(pool);
        await request(app)
            .post('/api/recareas')
            .send({ city: 'Las Vegas', state: 'Nevada', radius: 200 })
            .then(async () => {
                await request(app).post('/api/recareas').send({
                    city: 'Portland',
                    state: 'Oregon',
                    radius: 100,
                });
            });
        const result = await request(app).get('/api/recareas');
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    lat: expect.any(Number),
                    long: expect.any(Number),
                    recAreaName: expect.any(String),
                    recAreaDescription: expect.any(String),
                    recAreaDirections: expect.any(String),
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    lat: expect.any(Number),
                    long: expect.any(Number),
                    recAreaName: expect.any(String),
                    recAreaDescription: expect.any(String),
                    recAreaDirections: expect.any(String),
                }),
            ])
        );
    });

    it('should get a recarea by id', async () => {
        await setup(pool);
        await request(app)
            .post('/api/recareas')
            .send({ city: 'Portland', state: 'Oregon', radius: 100 });
        const result = await request(app).get('/api/recareas/1');
        expect(result.body).toEqual(
            expect.objectContaining({
                id: 1,
                lat: expect.any(Number),
                long: expect.any(Number),
                recAreaName: expect.any(String),
            })
        );
    });

    it('should update a rec area by id', async () => {
        await setup(pool);
        await request(app)
            .post('/api/recareas')
            .send({ city: 'Portland', state: 'Oregon', radius: 100 });
        const result = await request(app).patch('/api/recareas/1').send({
            recAreaName: 'The Edge of the World',
            recAreaDescription: 'Here there be dragons',
        });
        expect(result.body).toEqual(
            expect.objectContaining({
                recAreaName: 'The Edge of the World',
                recAreaDescription: 'Here there be dragons',
            })
        );
    });

    it('should delete a recarea from the database by id', async () => {
        await setup(pool);
        await request(app)
            .post('/api/recareas')
            .send({ city: 'Portland', state: 'Oregon', radius: 100 });
        await request(app).delete('/api/recareas/1');
        const res = await request(app).get('/api/recareas');
        expect(res.body).toEqual([]);
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
