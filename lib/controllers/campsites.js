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
    })
    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const { campsitename, typeofuse, lat, long } = req.body;
            const campsite = await CampsiteService.patchCampsiteById({
                id,
                campsitename,
                typeofuse,
                lat,
                long,
            });
            res.send(campsite);
        } catch (err) {
            next(err);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            await CampsiteService.deleteCampsite(id);
            res.send('deleted successfully');
        } catch (err) {
            next(err);
        }
    });
