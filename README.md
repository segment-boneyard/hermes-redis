# hermes-redis

persisted storage plugin for [hermes](https://github.com/segmentio/hermes) with [redis](http://redis.io/).

### set

``` js
robot.data(key, value);
```

### get

``` js
robot.data(key, function(err, value){});
```

### redis url to connect to

defaults to `redis://localhost:6379` and can be set via `REDIS_URL` env var.

## LICENSE

MIT
