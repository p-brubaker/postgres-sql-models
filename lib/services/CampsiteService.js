import Campsite from '../models/Campsite.js';
import cities from '../../data/cities/cities.js';
import getLatLong from '../utils/getLatLong.js';
import fetchCampsite from '../utils/fetchCampsite.js';

export default class CampsiteService {
    static async findCampsite({ city, state, radius }) {
        const { lat, long } = getLatLong({ cities, city, state });
        const campsite = await fetchCampsite({ lat, long, radius });
        const result = await Campsite.insert({
            campsiteName: campsite.CampsiteName,
            typeOfUse: campsite.typeOfUse,
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
}
