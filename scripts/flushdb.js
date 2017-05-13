const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)
client.flushdb((err, r) => {
  console.log(err || r)
  client.end(false)
})