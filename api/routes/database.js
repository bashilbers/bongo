var controller = function(app, dbApi) {
    // cRud
    app.get('/api/hosts/:host/databases/:database', function(req, res) {
        dbApi.find(req.params.host, req.params.database, function(err, database) {
            res.json(database);
        });
    });

    // cRud
    app.get('/api/hosts/:host/databases', function(req, res) {
        dbApi.findAll(req.params.host, function(err, databases) {
            res.json(databases);
        });
    });

    // crUd
    app.post('/api/hosts/:host/databases/:database/actions/:action', function(req, res) {
        switch(req.params.action) {
            case 'rename':
                dbApi.rename(req.params.host, req.params.database, req.body.toDb, function(err, result) {
                    res.json(result);
                });
                break;

            case 'copy':
                dbApi.copy(req.params.host, req.params.database, req.body.toDb, function(err, result) {
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

    // cruD
    app.delete('/api/hosts/:host/databases/:database', function(req, res) {
        dbApi.remove(req.params.host, req.params.database, function(err, result) {
            res.json(result);
        });
    });
};

module.exports = controller;