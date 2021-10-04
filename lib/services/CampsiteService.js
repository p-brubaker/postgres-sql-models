import Campsite from '../models/Campsite.js';
import cities from '../../data/cities/cities.js';
import getLatLong from '../utils/getLatLong.js';
import fetchRecDataObject from '../utils/fetchRecDataObject.js';

export default class CampsiteService {
    static async findCampsite({ city, state, radius }) {
        const { cityLatitude, cityLongitude } = getLatLong({
            cities,
            city,
            state,
        });
        const campsite = await fetchRecDataObject('campsites', {
            cityLatitude,
            cityLongitude,
            form: {
                lat: 'CampsiteLatitude',
                long: 'CampsiteLongitude',
            },
            radius,
        });
        const result = await Campsite.insert({
            campsitename: campsite.campsiteName,
            typeofuse: campsite.typeOfUse,
            lat: campsite.CampsiteLatitude,
            long: campsite.CampsiteLongitude,
        });
        return result;
    }

    static async getAllCampsites() {
        const campsites = await Campsite.getAllCampsites();
        return campsites;
    }

    static async getCampsiteById(id) {
        const campsite = await Campsite.getCampsiteById(id);
        return campsite;
    }

    static async patchCampsiteById(obj) {
        const campsite = await Campsite.patchCampsiteById(obj);
        return campsite;
    }

    static async deleteCampsite(id) {
        await Campsite.deleteCampsite(id);
    }
}
