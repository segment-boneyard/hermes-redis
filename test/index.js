var assert = require('assert');
var Hermes = require('hermes');
var redis = require('../lib');

var robot;

describe('redis', function(){
  beforeEach(function(){
    robot = new Hermes('Robot');
    robot.use(redis());
  });

  describe('#data', function(){
    it('should set and get key and value', function(done){
      robot.data('key', 'value');
      robot.data('key', function(err, value){
        if (err) return done(err);
        assert.equal('value', value);
        done();
      });
    });

    it('should emit "data"', function(done){
      robot.once('data', function(key, val){
        assert.equal(key, 'key');
        assert.equal(val, 'value');
        done();
      });
      robot.data('key', 'value');
    });

    it('should return this', function(){
      var self = robot.data('key', 'value');
      assert.equal(robot, self);
    });
  });
});
