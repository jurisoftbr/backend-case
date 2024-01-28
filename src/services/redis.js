import redis from 'redis';
import { REDIS_URL } from '../config.js';

export const redisClient = redis.createClient({
	url: REDIS_URL,
});
