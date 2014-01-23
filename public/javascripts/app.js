define([
    'backbone',
    'backbone.marionette',
    'regions/Modal',
    'utils'
], function(Backbone, Marionette, ModalRegion) {
    var Bongo = new Marionette.Application;

    Bongo.navigate = function(route) {
      Backbone.history.navigate(route, { trigger: true });
    }

    Bongo.reqres.setHandler('default:region', function() {
        return Bongo.mainRegion
    });

    Bongo.reqres.setHandler('modal:region', function() {
        return Bongo.modalRegion
    });

    Bongo.addRegions({
        mainRegion: '#main',
        modalRegion: new ModalRegion({
            el: '#modal'
        })
    });

    Bongo.addInitializer(function() {
        Backbone.history.start();
    });

    return Bongo;
});