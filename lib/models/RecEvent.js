import pool from '../utils/pool.js';

export default class RecEvent {
    constructor(row) {
        this.id = row.id;
        this.entityId = row.entity_id;
        this.eventName = row.event_name;
        this.description = row.description;
    }

    static async insert({ entityId, eventName, description }) {
        const { rows } = await pool.query(
            `INSERT INTO events (
                entity_id,
                event_name,
                description
            ) VALUES ($1, $2, $3)
            RETURNING *;`,
            [entityId, eventName, description]
        );
        return new RecEvent(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM events;');
        return rows.map((row) => new RecEvent(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `
        SELECT * FROM events
        WHERE id=$1`,
            [id]
        );
        return new RecEvent(rows[0]);
    }

    static async updateById({ id, eventName, description }) {
        const { rows } = await pool.query(
            `UPDATE events
            SET
                event_name=$1,
                description=$2
            WHERE events.id=$3
            RETURNING *;`,
            [eventName, description, id]
        );
        return new RecEvent(rows[0]);
    }
}
