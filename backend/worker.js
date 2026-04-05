import 'dotenv/config';
import { Worker } from "bullmq";
import IORedis from 'ioredis'
import { pool } from "./src/db/db.js";

const connection = new IORedis(process.env.UPSTASH_REDIS_URL, { maxRetriesPerRequest: null })

const worker = new Worker("logQueue", async (job) => {
    const { service, level, message } = job.data

    await pool.query(
        "INSERT INTO logs (service, level, message) VALUES ($1, $2, $3) RETURNING *",
        [service, level, message]
    )
    console.log("Log saved:", job.data)
}, {
    connection,
})

worker.on("completed", () => console.log("Job done"))
worker.on("failed", (job, err) => console.log(`Job failed: ${job.id}`, err.message))