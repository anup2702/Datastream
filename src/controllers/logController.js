import { pool } from '../db/db.js'
import { z } from 'zod'

const logSchema = z.object({
    service: z.string().min(1),
    level: z.enum(['info', 'error', 'warn']),
    message: z.string().min(1),
})

export const addLog = async (req, res) => {

    try {
        const data = logSchema.parse(req.body)
        const result = await pool.query(
            "INSERT INTO logs (service, level, message) VALUES ($1, $2, $3) RETURNING *",
            [data.service, data.level, data.message]
        )
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getLogs = async (req, res) => {
    try {
        const { level, page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        let query = "SELECT * FROM logs";
        let values = [];

        // Filtering
        if (level) {
            query += ` WHERE level = $${values.length + 1}`;
            values.push(level);
        }

        // Sorting
        query += " ORDER BY created_at DESC";

        // Pagination
        query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, offset);

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};