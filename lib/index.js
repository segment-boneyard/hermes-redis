var redis = require('redis');
var Url = require('url');

/**
 * Expose `plugin`.
 */

module.exports = exports = plugin;

/**
 * Add redis storage to the `robot`.
 *
 * @return {Function}
 */

function plugin(){
  return function(robot){
    var url = Url.parse(process.env.REDIS_URL || 'redis://localhost:6379', true);
    var client = redis.createClient(url.port, url.hostname);
    var prefix = url.path ? url.path.replace('/', '') : 'hermes';

    /**
     * Get or set a data by `key`.
     *
     * @param {String} key
     * @param {Object|Function} value (optional)
     * @return {Mixed}
     */

    robot.data = function(key, value){
      if (typeof value == 'function') {
        // value is callback fn
        get.call(this, key, value);
      } else {
        set.call(this, key, value);
      }
      return this;
    };

    /**
     * Set value by `key` with `value`.
     *
     * @param {String} key
     * @param {Mixed} value
     */

    function set(key, value) {
      client.set(prefixKey(key), JSON.stringify(value), redis.print);
      this.emit('data', key, value);
    }

    /**
     * Get value by `key`.
     *
     * @param {String} key
     * @param {Function} cb
     */

    function get(key, cb) {
      var self = this;
      client.get(prefixKey(key), function(err, res){
        if (err) return cb(err);
        var value = JSON.parse(res.toString());
        cb(null, value);
        self.emit('data', key, value);
      });
    }

    /**
     * Return `key` prefixed.
     *
     * @param {String} key
     * @return {String}
     */

    function prefixKey(key) {
      return prefix + ':' + key;
    }
  };
}
