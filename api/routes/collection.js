var _ = require('underscore')._;

var controller = function(app, collectionApi) {
    // cRud
    app.get('/api/hosts/:host/databases/:database/collections', function(req, res) {
        collectionApi.findAll(req.params.host, req.params.database, function(err, collections) {
            res.json(_.map(results, function(col) {
                return { name: col.name.replace(req.params.database + '.', '') };
            }));
        });
    });

    // cruD
    app.delete('/api/hosts/:host/databases/:database/collections/:collection', function(req, res) {
        collectionApi.remove(req.params.host, req.params.database, req.params.collection, function(err, result) {
            res.json(result);
        });
    });
};

module.exports = controller;