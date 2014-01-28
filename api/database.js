var mongo = require('mongoskin');
var _ = require("underscore")._;

var _module = function(hostApi) {
    function getRemoteHostConnection(host) {
        return mongo.db(host.host + ':' + host.port + '/' + host.defaultDatabase);
    }

    var api = {
        find: function(hostId, id, callback) {
            hostApi.find(hostId, function(err, host) {
                if (err) return callback(err, null);
                var remoteDb = getRemoteHostConnection(host);
                remoteDb.admin.listDatabases(function(err, results) {
                    if (err) return callback(err, null);
                    return callback(null, _.filter(results.databases, function(database) {
                        return database.name === id;
                    }));
                });
            })
        },

        findAll: function(hostId, callback) {
           hostApi.find(hostId, function(err, host) {
                if (err) return callback(err, null);
                var remoteDb = getRemoteHostConnection(host);
                remoteDb.admin.listDatabases(function(err, results) {
                    if (err) return callback(err, null);
                    return callback(null, results.databases);
                });
            }) 
        },

        rename: function(hostId, id, toDb, callback) {
            api.copy(hostId, id, toDb, function(err, copyResult) {
                if (err) return callback(err, null);
                api.remove(hostId, id, function(err, deleteResult) {
                    if (err) return callback(err, null);
                    return callback(null, { ok: true });
                });
            });
        },

        copy: function(hostId, id, toDb, callback) {
            console.log('Copying ' + id + ' to ' + toDb);
            hostApi.find(hostId, function(err, host) {
                if (err) return callback(err, null);
                var remoteDb = getRemoteHostConnection(host);
                remoteDb.admin.command({
                    copydb: 1,
                    fromdb: id,
                    todb: toDb
                }, function(err, result) {
                    callback(null, result);
                });
            });
        },

        remove: function(hostId, id, callback) {
            console.log('Removing ' + id);
            hostApi.find(hostId, function(err, host) {
                if (err) return callback(err, null);
                // kinda lame way to do it, but cant find any other way
                host.defaultDatabase = id;
                var remoteDb = getRemoteHostConnection(host);
                remoteDb.dropDatabase(function(err, result) {
                    if (err) return callback(err, null);
                    return callback(null, result);
                });
            });
        }
    };

    return api;
};

module.exports = _module;