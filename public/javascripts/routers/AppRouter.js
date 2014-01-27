define([
    'backbone.marionette'
], function(Marionette) {
    return Marionette.AppRouter.extend({
        appRoutes: {
            '': 'listHosts',
            'hosts': 'listHosts',
            'hosts/:host/databases': 'listDatabases',
            'hosts/:host/databases/:database/collections': 'listCollections',
            'hosts/:host/databases/:database/collections/:collection/documents': 'listDocuments'
        }
    });
});