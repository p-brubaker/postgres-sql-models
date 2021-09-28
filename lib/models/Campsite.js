import pool from '../utils/pool.js';

export default class Campsite {
    constructor(row) {
        this.id = row.id;
        this.campsiteName = row.campsiteName;
        this.typeOfUse = row.typeOfUse;
        this.lat = row.lat;
        this.long = row.long;
    }

    static async insert({ campsiteName, typeOfUse, lat, long }) {
        const { rows } = await pool.query(
            `INSERT INTO campsites (
                campsiteName,
                typeOfUse,
                lat,
                long) VALUES ($1, $2, $3, $4)
                RETURNING *;`,
            [campsiteName, typeOfUse, lat, long]
        );
        return new Campsite(rows[0]);
    }
}
