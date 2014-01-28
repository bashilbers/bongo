var controller = function(app) {
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
};

module.exports = controller;