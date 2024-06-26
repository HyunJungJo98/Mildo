import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    connectTimeout: 50000
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
  console.log('[REDIS] CONNECTED');
});

redisClient.on('error', err => {
  console.log('[REDIS ERROR]', err);
});

export const connectRedis = async () => {
  await redisClient.connect();
  return;
};
