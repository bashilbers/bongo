define([
    'backbone',
    'backbone.marionette',
], function(Backbone, Marionette) {
    var Bongo = new Marionette.Application;

    Bongo.reqres.setHandler('default:region', function() {
        return Bongo.mainRegion
    });

    Bongo.addRegions({
        mainRegion: 'main'
    });

    Bongo.addInitializer(function() {
        Backbone.history.start();
    });

    return Bongo;
});