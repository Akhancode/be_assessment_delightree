const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || `redis://localhost:${REDIS_PORT}`,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 1) {
        console.error("Redis: Max reconnection attempts reached. Giving up.");
        return false;
      }
      console.log(`Redis: Reconnection attempt #${retries}`);
      return 500;
    },
  },
});

redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.error("Failed to connect to Redis:", err));

// Handle errors
redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = {
  getClient: () => (redisClient.isReady ? redisClient : null),
};
