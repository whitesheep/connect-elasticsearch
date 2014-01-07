var elasticsearch = require('elasticsearch'),
    util = require('util'),
    _ttl = 86400;


module.exports = function(connect) {
	function ElasticsearchStore(options) {
		options = options || {};
		Store.call(this, options);
	}

	util.inherits(ElasticsearchStore, connect.session.Store);

	ElasticsearchStore.prototype.prefix = '';

	ElasticsearchStore.prototype.getKey = function getKey(sid) {
		return this.prefix + sid;
	}

	ElasticsearchStore.prototype.get = function(sid, fn) {

	}

	ElasticsearchStore.prototype.set = function(sid, sess, fn) {

	}

	ElasticsearchStore.prototype.destroy = function(sid, fn) {
		
	}

	ElasticsearchStore.prototype.length = function(fn) {

    }

	ElasticsearchStore.prototype.clear = function(fn) {

    }

	return ElasticsearchStore;
}