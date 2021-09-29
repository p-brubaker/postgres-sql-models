import pool from '../utils/pool.js';

export default class Campsite {
    constructor(row) {
        this.id = row.id;
        this.campsitename = row.campsitename || null;
        this.typeofuse = row.typeofuse || null;
        this.lat = row.lat;
        this.long = row.long;
    }

    static async insert({ campsiteName, typeOfUse, lat, long }) {
        const { rows } = await pool.query(
            `INSERT INTO campsites (
                campsitename,
                typeofuse,
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

    static async patchCampsiteById({ id, campsitename, lat, long, typeofuse }) {
        const { rows } = await pool.query(
            `
        UPDATE campsites
        SET
            campsitename=$1,
            lat=$2,
            long=$3,
            typeofuse=$4
        WHERE campsites.id=$5
        RETURNING *;`,
            [campsitename, lat, long, typeofuse, id]
        );
        return new Campsite(rows[0]);
    }
}
