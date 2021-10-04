import { Router } from 'express';
import RecAreaService from '../services/RecAreaService.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const recarea = await RecAreaService.findRecArea(req.body);
            res.send(recarea);
        } catch (err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const recareas = await RecAreaService.getAllRecAreas();
            res.send(recareas);
        } catch (err) {
            next(err);
        }
    });
