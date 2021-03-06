import RecArea from '../models/RecArea.js';
import cities from '../../data/cities/cities.js';
import getLatLong from '../utils/getLatLong.js';
import fetchRecDataObject from '../utils/fetchRecDataObject';

export default class RecAreaService {
    static async findRecArea({ city, state, radius }) {
        const { cityLatitude, cityLongitude } = getLatLong({
            cities,
            city,
            state,
        });
        const recarea = await fetchRecDataObject('recareas', {
            cityLatitude,
            cityLongitude,
            form: {
                lat: 'RecAreaLatitude',
                long: 'RecAreaLongitude',
            },
            radius,
        });

        const result = await RecArea.insert({
            recareaname: recarea.RecAreaName,
            recareadescription: recarea.RecAreaDescription,
            recareadirections: recarea.RecAreaDirections,
            lat: recarea.RecAreaLatitude,
            long: recarea.RecAreaLongitude,
        });
        return result;
    }

    static async getAllRecAreas() {
        const result = await RecArea.getAll();
        return result;
    }

    static async getRecAreaById(id) {
        const result = await RecArea.getById(id);
        return result;
    }

    static async updateRecAreaById(obj) {
        const result = await RecArea.updateById(obj);
        return result;
    }

    static async deleteRecAreaById(id) {
        await RecArea.deleteById(id);
    }
}
