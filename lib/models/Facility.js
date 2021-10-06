import pool from '../utils/pool.js';

export default class Facility {
    constructor(row) {
        this.id = row.id;
        this.lat = row.lat;
        this.long = row.long;
        this.description = row.description;
    }

    static async insert({ lat, long, description }) {
        const { rows } = await pool.query(
            `INSERT INTO facilities (
                lat,
                long,
                description
            ) VALUES ($1, $2, $3)
            RETURNING *;`,
            [lat, long, description]
        );
        return new Facility(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM facilities
            WHERE id=$1;`,
            [id]
        );
        return new Facility(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM facilities;');
        return rows.map((row) => new Facility(row));
    }

    static async updateById({ id, description }) {
        const { rows } = await pool.query(
            `
        UPDATE facilities
        SET description=$1
        WHERE id=$2
        RETURNING *
            ;`,
            [description, id]
        );
        return new Facility(rows[0]);
    }
}
