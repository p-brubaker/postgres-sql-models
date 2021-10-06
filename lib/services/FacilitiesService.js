import Facility from '../models/Facility.js';
import cities from '../../data/cities/cities.js';
import getLatLong from '../utils/getLatLong.js';
import fetchRecDataObject from '../utils/fetchRecDataObject';

export default class FacilitiesService {
    static async findFacility({ city, state, radius }) {
        const { cityLatitude, cityLongitude } = getLatLong({
            cities,
            city,
            state,
        });

        const facility = await fetchRecDataObject('facilities', {
            cityLatitude,
            cityLongitude,
            form: {
                lat: 'FacilityLatitude',
                long: 'FacilityLongitude',
            },
            radius,
        });

        const result = await Facility.insert({
            lat: facility.FacilityLatitude,
            long: facility.FacilityLongitude,
            description: facility.FacilityDescription,
        });

        return result;
    }

    static async getById(id) {
        const result = await Facility.getById(id);
        return result;
    }

    static async getAll() {
        const result = await Facility.getAll();
        return result;
    }
}
