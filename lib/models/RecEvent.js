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
}
