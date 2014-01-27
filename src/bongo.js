var mongo = require('mongoskin');
var _ = require("underscore")._;
var uuid = require('node-uuid');

var controller = function(app, config) {
    var db = mongo.db(config.db.dsn);

    /***** Hosts *****/

    app.get('/api/hosts', function(req, res) {
        db.collection('hosts').findItems(function(err, results) {
            res.json(results);
        });
    });

    app.post('/api/hosts', function(req, res) {
        db.collection('hosts').insert(req.body, function(err, result) {
            res.json(result);
        });
    });

    app.get('/api/hosts/:id', function(req, res) {
        db.collection('hosts').findById(req.params.id, function(err, result) {
            res.json(result);
        });
    });

    app.put('/api/hosts/:id', function(req, res) {
        db.collection('hosts').updateById(req.params.id, req.body, {}, function(err, result) {
            res.json(result);
        });
    });

    app.delete('/api/hosts/:id', function(req, res) {
        db.collection('hosts').removeById(req.params.id, function(err, result) {
            res.json(result);
        });
    });

    /***** Databases *****/

    app.get('/api/hosts/:id/databases', function(req, res) {
        db.collection('hosts').findById(req.params.id, function(err, result) {
            mongo.db(result.host + ':' + result.port + '/admin').admin.listDatabases(function(err, results) {
                res.json(results.databases);
            });
        });
    });

    app.post('/api/hosts/:host/databases/:database/actions/:action', function(req, res) {
        db.collection('hosts').findById(req.params.host, function(err, result) {
            var remoteDb = mongo.db(result.host + ':' + result.port + '/admin');

            switch(req.params.action) {
                case 'rename':
                    var tmpName = 'db_' + req.params.database + '_' + uuid.v1();

                    remoteDb.command({
                        copyDb: true,
                        fromdb: req.params.database,
                        toDb: tmpName
                    }, function(err, copyResult) {
                        remoteDb.dropDatabase(req.params.database, function(err) {
                            res.json(copyResult);
                        });
                    })

                    break;

                case 'copy':
                    remoteDb.command({
                        copydb: 1,
                        fromdb: req.params.database,
                        toDb: req.body.toDb
                    }, function(err, result) {
                        res.json(result);
                    });
                    break;

                case 'getStats':
                    break;

                case 'repair':
                    break;

                case 'closeCursors':
                    break;

                case 'fsync':
                    break;
            }
        });
    });

    app.delete('/api/hosts/:host/databases/:database', function(req, res) {
        db.collection('hosts').findById(req.params.host, function(err, result) {
            mongo.db(result.host + ':' + result.port + '/' + req.params.database).dropDatabase(function(err, result) {
                res.json(result);                
            });
        });
    });

    /***** Collections ****/

    app.get('/api/hosts/:host/databases/:database/collections', function(req, res) {
        db.collection('hosts').findById(req.params.host, function(err, hostDoc) {
            mongo.db(hostDoc.host + ':' + hostDoc.port + '/' + req.params.database).collectionNames(function(err, results) {
                var out = _.map(results, function(col) {
                    return { name: col.name.replace(req.params.database + '.', '') };
                });

                res.json(out);
            });
        });
    });

    app.delete('/api/hosts/:host/databases/:database/collections/:collection', function(req, res) {
        db.collection('hosts').findById(req.params.host, function(err, hostDoc) {
            mongo.db(hostDoc.host + ':' + hostDoc.port + '/' + req.params.database).dropCollection(req.params.collection, function(err, result) {
                res.json(result);
            });
        });
    });

    /**** Documents ****/

    app.get('/api/hosts/:host/databases/:database/collections/:collection/documents', function(req, res) {
        db.collection('hosts').findById(req.params.host, function(err, hostDoc) {
            mongo.db(hostDoc.host + ':' + hostDoc.port + '/' + req.params.database).collection(req.params.collection).findItems(function(err, results) {
                res.json(results);
            });
        });
    });

    app.get('/api/hosts/:host/databases/:database/collections/:collection/documents/:document', function(req, res) {
        db.collection('hosts').findById(req.params.host, function(err, hostDoc) {
            mongo.db(hostDoc.host + ':' + hostDoc.port + '/' + req.params.database).collection(req.params.collection).findById(req.params.document, function(err, result) {
                res.json(result);
            });
        });
    });
}

module.exports = controller;