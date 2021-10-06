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
    })
    .get('/', async (req, res, next) => {
        try {
            const facilities = await FacilitiesService.getAll();
            res.send(facilities);
        } catch (err) {
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const objToUpdate = req.body;
            const facility = await FacilitiesService.updateById({
                id,
                ...objToUpdate,
            });
            res.send(facility);
        } catch (err) {
            next(err);
        }
    });
