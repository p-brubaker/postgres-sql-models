import { Router } from 'express';
import EventsService from '../services/EventsService.js';

export default Router().post('/', async (req, res, next) => {
    try {
        const recAreaId = req.body.id;
        const event = await EventsService.saveEvent(recAreaId);
        res.send(event);
    } catch (err) {
        next(err);
    }
});
