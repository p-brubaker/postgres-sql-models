import fetch from 'node-fetch';
import haversine from 'haversine';

const URL = 'https://ridb.recreation.gov/api/v1/';

const fetchRecDataObject = async (endpoint, city) => {
    const { cityLatitude, cityLongitude, form, radius } = city;

    const res = await fetch(`${URL}${endpoint}`, {
        method: 'GET',
        headers: {
            apikey: process.env.REC_API_KEY,
        },
    });

    const json = await res.json();
    const recObjArray = json['RECDATA'];
    const matches = [];

    for (const recObj of recObjArray) {
        const start = { latitude: cityLatitude, longitude: cityLongitude };
        const end = {
            latitude: recObj[form.lat],
            longitude: recObj[form.long],
        };

        if (haversine(start, end, { unit: 'mile' }) < radius) {
            matches.push(recObj);
        }
    }
    const choice = Math.floor(Math.random() * matches.length);
    return matches[choice];
};

export default fetchRecDataObject;
