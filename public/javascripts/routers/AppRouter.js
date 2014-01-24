define([
    'backbone.marionette'
], function(Marionette) {
    return Marionette.AppRouter.extend({
        appRoutes: {
            '': 'listHosts',
            'hosts': 'listHosts',
            'hosts/:host/databases': 'listDatabases'
        }
    });
});