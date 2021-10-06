import { Router } from 'express';
import EventsService from '../services/EventsService.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const recAreaId = req.body.id;
            const event = await EventsService.saveEvent(recAreaId);
            res.send(event);
        } catch (err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const events = await EventsService.getAll();
            res.send(events);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const event = await EventsService.getById(id);
            res.send(event);
        } catch (err) {
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const objToUpdate = req.body;
            const event = await EventsService.updateById({
                id,
                ...objToUpdate,
            });
            res.send(event);
        } catch (err) {
            next(err);
        }
    });
