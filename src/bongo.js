var mongo = require('mongoskin');

var controller = function(app, config) {
	app.get('/api/databases', function(req, res) {
		mongo.db(config.mongo.dsn).admin.listDatabases(function(err, results) {
			res.json(results['databases']);
		});
	});
}

module.exports = controller;