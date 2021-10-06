import { Router } from 'express';
import FacilitiesService from '../services/FacilitiesService.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const facility = await FacilitiesService.findFacility(req.body);
            res.send(facility);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const facility = await FacilitiesService.getById(id);
            res.send(facility);
        } catch (err) {
            next(err);
        }
    });
