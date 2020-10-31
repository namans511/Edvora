const redis = require("redis");
const client = redis.createClient();

exports.set = (key, value) => {
  client.set(key, value, redis.print);
  console.log("value set");
};
