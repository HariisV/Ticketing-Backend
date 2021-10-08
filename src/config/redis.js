const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
  // eslint-disable-next-line no-console
  console.log("You're now connected db redis ...");
});

module.exports = client;
