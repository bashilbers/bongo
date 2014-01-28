var mongo = require('mongoskin');

var controller = function(app, config) {
    var db = mongo.db(config.db.dsn);

    var hostApi = require('../api/host')(db);
    var dbApi = require('../api/database')(hostApi);
    //var collectionApi = require('../api/collection')(hostApi);
    //var documentApi = require('../api/document');

    require('../api/routes/host')(app, hostApi);
    require('../api/routes/database')(app, dbApi);
    //require('../api/routes/collection')(app, collectionApi);
    //require('../api/routes/document')(app);
}

module.exports = controller;