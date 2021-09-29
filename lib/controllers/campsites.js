import { Router } from 'express';
import CampsiteService from '../services/CampsiteService';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const campsite = await CampsiteService.findCampsite(req.body);
            res.send(campsite);
        } catch (err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const campsites = await CampsiteService.getAllCampsites();
            res.send(campsites);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const campsite = await CampsiteService.getCampsiteById(id);
            res.send(campsite);
        } catch (err) {
            next(err);
        }
    });
