import pool from '../utils/pool.js';

export default class RecArea {
    constructor(row) {
        this.id = row.id;
        this.recAreaName = row.recareaname;
        this.recAreaDescription = row.recareadescription;
        this.recAreaDirections = row.recareadirections;
        this.lat = row.lat;
        this.long = row.long;
    }

    static async insert({
        recareaname,
        recareadescription,
        recareadirections,
        lat,
        long,
    }) {
        const { rows } = await pool.query(
            `INSERT INTO recareas (
                recareaname,
                recareadescription,
                recareadirections,
                lat,
                long
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
            [recareaname, recareadescription, recareadirections, lat, long]
        );
        return new RecArea(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM recareas;');
        return rows.map((row) => new RecArea(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `
        SELECT * FROM recareas
        WHERE id=$1;`,
            [id]
        );
        return new RecArea(rows[0]);
    }

    static async updateById({
        id,
        recAreaName,
        recAreaDescription,
        recAreaDirections,
        lat,
        long,
    }) {
        const { rows } = await pool.query(
            `UPDATE recareas
            SET
                recareaname=$1,
                recareadescription=$2,
                recareadirections=$3,
                lat=$4,
                long=$5
            WHERE recareas.id=$6
            RETURNING *;`,
            [recAreaName, recAreaDescription, recAreaDirections, lat, long, id]
        );
        return new RecArea(rows[0]);
    }
}
