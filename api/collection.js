var mongo = require('mongoskin');
var _ = require("underscore")._;

var _module = function(hostApi) {
    function getRemoteHostConnection(host) {
        return mongo.db(host.host + ':' + host.port + '/' + host.defaultDatabase);
    }

	var api = {
		// cRud
		findAll: function(hostId, databaseId, callback) {
	        db.collection('hosts').findById(req.params.host, function(err, hostDoc) {
	            mongo.db(hostDoc.host + ':' + hostDoc.port + '/' + req.params.database).collectionNames(function(err, results) {
	                
	            });
	        });
		},

		// cruD
		remove: function(hostId, databaseId, collectionId, callback) {
	        db.collection('hosts').findById(req.params.host, function(err, hostDoc) {
	            mongo.db(hostDoc.host + ':' + hostDoc.port + '/' + req.params.database).dropCollection(req.params.collection, function(err, result) {
	                res.json(result);
	            });
	        });
		}
	};

	return api;
}

module.exports = _module;