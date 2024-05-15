require('dotenv').config()
const Redis = require("ioredis");

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: "default", //ga usah diganti
    password: process.env.REDIS_PASSWORD,
    db: 0,
});

module.exports = redis;