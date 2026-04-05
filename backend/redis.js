import IORedis from 'ioredis'

export const redis = new IORedis(process.env.UPSTASH_REDIS_URL)