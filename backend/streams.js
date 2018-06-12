const redis = require('redis');
const { promisify } = require('util');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const MAX_CONCURRENT_STREAMS = 3;
const SLOT_LOCK_EXPIRE_SECONDS = 30;

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);

const lockStreamSlot = async userId => {
  const token = 'xxxxx';
  for (let i = 0; i < MAX_CONCURRENT_STREAMS; i++) {
    let key = `stream-slot-${userId}-${i}`;
    // Successfully acquired lock
    if (await redisSet(key, token, 'NX', 'EX', SLOT_LOCK_EXPIRE_SECONDS)) {
      console.log('Succesfully acquired lock', key);
      return { key, token };
    }
  }
  // No slot available
  throw 'No free stream slot available';
};

module.exports = {
  lockStreamSlot,
}