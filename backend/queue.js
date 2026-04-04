import { Queue } from 'bullmq'
import IORedis from 'ioredis'
import { Connection } from 'pg'

const connection = new IORedis({ maxRetriesPerRequest: null })

export const logQueue = new Queue("logQueue", {
    connection,
})