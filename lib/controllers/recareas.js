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
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const recarea = await RecAreaService.getRecAreaById(id);
            res.send(recarea);
        } catch (err) {
            next(err);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const {
                recAreaName,
                recAreaDescription,
                recAreaDirections,
                lat,
                long,
            } = req.body;
            const recarea = await RecAreaService.updateRecAreaById({
                id,
                recAreaName,
                recAreaDescription,
                recAreaDirections,
                lat,
                long,
            });
            res.send(recarea);
        } catch (err) {
            next(err);
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            await RecAreaService.deleteRecAreaById(id);
            res.send('deleted successfully');
        } catch (err) {
            next(err);
        }
    });
