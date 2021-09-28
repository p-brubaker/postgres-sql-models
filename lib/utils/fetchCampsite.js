import fetch from 'node-fetch';
import haversine from 'haversine';

const URL = 'https://ridb.recreation.gov/api/v1/campsites';

const fetchCampsite = async (city) => {
    const { lat, long, radius } = city;
    const res = await fetch(URL, {
        method: 'GET',
        headers: {
            apikey: process.env.REC_API_KEY,
        },
    });
    const json = await res.json();
    const campsites = json['RECDATA'];
    const matches = [];
    for (const campsite of campsites) {
        const campLat = campsite.CampsiteLatitude;
        const campLong = campsite.CampsiteLongitude;
        const start = { latitude: lat, longitude: long };
        const end = { latitude: campLat, longitude: campLong };
        if (haversine(start, end, { unit: 'mile' }) < radius) {
            matches.push(campsite);
        }
    }
    const choice = Math.floor(Math.random() * matches.length);
    return matches[choice];
};

export default fetchCampsite;
