var mongo = require('mongoskin');

var controller = function(app, config) {
    var db = mongo.db(config.db.dsn);

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
        db.collection('hosts').findOne({ _id: req.params.id}, function(err, result) {
            res.json(result);
        });
    });

    app.put('/api/hosts/:id', function(req, res) {
        db.collection('hosts').updateById(req.params.id, req.body, {}, function(err, result) {
            console.log(req.params.id, req.body);
            res.json(result);
        });
    });

    app.delete('/api/hosts/:id', function(req, res) {
        db.collection('hosts').removeById(req.params.id, function(err, result) {
            res.json(result);
        });
    });

    app.get('/api/hosts/:id/databases', function(req, res) {
        db.collection('hosts').findOne({ _id: req.params.id}, function(err, result) {
            console.log(result);
            res.end();
        });

        /*
        mongo.db(req.param.host).admin.listDatabases(function(err, results) {
            res.json(results['databases']);
        });
        */
    });
}

module.exports = controller;