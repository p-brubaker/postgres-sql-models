import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const mockEventData = {
    RECDATA: [
        {
            EventID: '10870',
            EntityID: '14748',
            EntityType: 'Asset',
            EventName: 'Bison Roundup',
            Description:
                'The Roundup consists of two separate events: The Push and The Working.',
            EventTypeDescription: '',
            EventFeeDescription:
                'The Roundup consists of two separate events: The Push and The Working.',
            EventFrequencyRateDescription:
                'The Roundup consists of two separate events: The Push and The Working.',
            EventScopeDescription:
                'The Roundup consists of two separate events: The Push and The Working.',
            EventAgeGroup: '',
            EventRegistrationRequired: false,
            EventADAAccess: '',
            EventComments:
                'The Roundup consists of two separate events: The Push and The Working.',
            EventEmail: '',
            EventURLAddress: '',
            EventURLText: 'Park Events',
            EventStartDate: '0001-01-01',
            EventEndDate: '0001-01-01',
            SponsorName: '',
            SponsorClassType: '',
            SponsorPhone: '',
            SponsorEmail: '',
            SponsorURLAddress:
                'http://stateparks.utah.gov/parks/antelope-island/events/',
            SponsorURLText: '',
            LastUpdatedDate: '2017-01-31',
        },
    ],
    METADATA: {
        RESULTS: {
            CURRENT_COUNT: 1,
            TOTAL_COUNT: 1,
        },
        SEARCH_PARAMETERS: {
            QUERY: '',
            LIMIT: 20,
            OFFSET: 0,
        },
    },
};

describe('Events routes', () => {
    const server = setupServer(
        rest.get(
            'https://ridb.recreation.gov/api/v1/recareas/14748/events',
            async (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(mockEventData));
            }
        )
    );

    beforeAll(() =>
        server.listen({
            onUnhandledRequest: 'bypass',
        })
    );
    beforeEach(async () => {
        await setup(pool);
        const entityId = '14748';
        await request(app).post('/api/events').send({ id: entityId });
    });

    afterEach(() => server.resetHandlers());

    it('should get an event associated with a given recareas id, save it and return it', async () => {
        await setup(pool);
        const entityId = '14748';
        const result = await request(app)
            .post('/api/events')
            .send({ id: entityId });
        expect(result.body).toEqual({
            id: 1,
            entityId: 14748,
            eventName: 'Bison Roundup',
            description:
                'The Roundup consists of two separate events: The Push and The Working.',
        });
    });

    it('should get all events in the database', async () => {
        const res = await request(app).get('/api/events');
        expect(res.body).toEqual(
            expect.arrayContaining([
                {
                    id: 1,
                    entityId: 14748,
                    eventName: 'Bison Roundup',
                    description:
                        'The Roundup consists of two separate events: The Push and The Working.',
                },
            ])
        );
    });

    it('should get an event by id', async () => {
        const res = await request(app).get('/api/events/1');
        expect(res.body).toEqual({
            id: 1,
            entityId: 14748,
            eventName: 'Bison Roundup',
            description:
                'The Roundup consists of two separate events: The Push and the Working.',
        });
    });

    afterAll(() => {
        pool.end();
        server.close();
    });
});
