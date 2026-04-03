import { pool } from '../db/db.js'
import { z } from 'zod'
import { logQueue } from '../../queue.js'
import { redis } from '../../redis.js'
import { cache } from 'react'

const logSchema = z.object({
    service: z.string().min(1),
    level: z.enum(['info', 'error', 'warn']),
    message: z.string().min(1),
})

export const addLog = async (req, res) => {

    try {
        const data = logSchema.parse(req.body)
        await logQueue.add("log-job", data, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000,
            },
        })
        res.json({ message: "Log added to queue" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getLogs = async (req, res) => {
    try {
        const { level, page = 1, limit = 10 } = req.query;

        const cacheKey = `logs:${level || "all"}:${page}:${limit}`

        // 1. Check Cache 
        const cachedData = await redis.get(cacheKey)
        if (cachedData) {
            console.log("Cache Hit")
            return res.json(JSON.parse(cachedData))
        }

        console.log("Cache MISS")

        // 2. DB Query
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

        await redis.set(cacheKey, JSON.stringify(result.rows), "EX", 60)
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};