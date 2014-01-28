//var fileupload = require('fileupload').createFileUpload('/uploads').middleware

var controller = function(app, hostApi) {
	app.get('/api/hosts', function(req, res) {
        hostApi.findAll(function(err, hosts) {
            res.json(hosts);
        });
    });

    app.post('/api/hosts', function(req, res) {
    	hostApi.create(req.body, function(err, result) {
    		res.json(result);
    	});
    });

    app.get('/api/hosts/:id', function(req, res) {
        hostApi.find(req.params.id, function(err, host) {
            res.json(host);
        });
    });

    app.put('/api/hosts/:id', function(req, res) {
    	hostApi.update(req.params.id, req.body, function(err, result) {
    		res.json(result);
    	});
    });

    app.delete('/api/hosts/:id', function(req, res) {
        hostApi.remove(req.params.id, function(err, result) {
            res.json(result);
        });
    });

    app.post('/api/hosts/:id/import', function(req, res) {
        console.log(req.files);
    });
};

module.exports = controller;