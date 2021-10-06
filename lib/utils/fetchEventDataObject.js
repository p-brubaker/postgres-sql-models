import fetch from 'node-fetch';

const URL = 'https://ridb.recreation.gov/api/v1/recareas/';

const fetchEventDataObject = async (recAreaId) => {
    const res = await fetch(`${URL}${recAreaId}/events`, {
        method: 'GET',
        headers: {
            apikey: process.env.REC_API_KEY,
        },
    });

    const json = await res.json();

    const eventObjArray = json['RECDATA'];
    return eventObjArray[0];
};

export default fetchEventDataObject;
