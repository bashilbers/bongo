define([
    'backbone.marionette'
], function(Marionette) {
    return Marionette.AppRouter.extend({
        appRoutes: {
            '': 'list',
        }
    });
});