var elasticsearch = require('elasticsearch'),
    util = require('util'),
    _ttl = '1h';


module.exports = function(connect) {
	var Store = connect.session.Store;

	function ElasticsearchStore(options) {
		var self = this;

		this.options = options || {};
		Store.call(this, options);

		this.es = {
			index: 'connect',
			type: 'session'
		}

		this.client = new elasticsearch.Client({
 			host: this.options.hosts
		});

		this.client.indices.create({
			index: this.es.index,
			type: this.es.type,
		}, function(){
			
			self.client.indices.putMapping({
				index: self.es.index,
				type: self.es.type,
				body: {
	    		"session" : {
	        	"_ttl" : { "enabled" : true }
	    		}
				}
			}, function(){ });

		});
	}

	util.inherits(ElasticsearchStore, connect.session.Store);

	ElasticsearchStore.prototype.pSid = function(sid) {
		return this.options.prefix + sid;
	}

	ElasticsearchStore.prototype.get = function(sid, cb) {
		this.client.get({
		  index: this.es.index,
		  type: this.es.type,
		  id: this.pSid(sid)
		}, function (e, r) {
			if ( typeof r == 'undefined' ) cb();
			else cb(null, r._source);
		})
	}

	ElasticsearchStore.prototype.set = function(sid, sess, cb) {
		var maxAge = sess.cookie.maxAge,
    	ttl = 'number' == typeof maxAge ? (maxAge / 1000 | 0) + "s" : _ttl;
		
		this.client.index({
		  index: this.es.index,
		  type: this.es.type,
		  id: this.pSid(sid),
		  ttl: ttl,
		  body: sess
		}, function (e, r) {
			cb(e);
		})

	}

	ElasticsearchStore.prototype.destroy = function(sid, cb) {
		this.client.delete({
		  index: this.es.index,
		  type: this.es.type,
		  id: this.pSid(sid)
		}, function (e, r) {
		  cb(e)
		});
	}

	return ElasticsearchStore;
}