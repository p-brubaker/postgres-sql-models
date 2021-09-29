import pool from '../utils/pool.js';

export default class Campsite {
    constructor(row) {
        this.id = row.id;
        this.campsiteName = row.campsiteName || null;
        this.typeOfUse = row.typeOfUse || null;
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

    static async getAllCampsites() {
        const { rows } = await pool.query('SELECT * FROM campsites');
        return rows.map((row) => new Campsite(row));
    }

    static async getCampsiteById(id) {
        const { rows } = await pool.query(
            `
        SELECT * FROM campsites 
        WHERE id=$1`,
            [id]
        );
        return new Campsite(rows[0]);
    }
}
