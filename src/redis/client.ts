import Redis from "ioredis";

const redis = new Redis({
  host: "redis", // 👈 service name from docker-compose
  port: 6379,
});

export default redis;