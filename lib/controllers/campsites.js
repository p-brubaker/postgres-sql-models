import { Router } from 'express';
import CampsiteService from '../services/CampsiteService';

export default Router().post('/', async (req, res, next) => {
    try {
        const campsite = await CampsiteService.findCampsite(req.body);
        res.send(campsite);
    } catch (err) {
        next(err);
    }
});
