define([
    'backbone',
    'backbone.marionette',
    'regions/Modal',
    'collections/Notification',
    'models/Notification',
    'views/collection/Notification',
    'utils'
], function(Backbone, Marionette, ModalRegion, NotificationCollection, Notification, NotificationsView) {
    var Bongo = new Marionette.Application;

    Bongo.notifications = new NotificationCollection();

    Bongo.navigate = function(route) {
      Backbone.history.navigate(route, { trigger: true });
    }

    Bongo.reqres.setHandler('default:region', function() {
        return Bongo.mainRegion
    });

    Bongo.reqres.setHandler('modal:region', function() {
        return Bongo.modalRegion
    });

    Bongo.commands.setHandler('alert', function(data) {
        Bongo.notifications.add(new Notification(data));
    });

    Bongo.addRegions({
        mainRegion: '#main',
        modalRegion: new ModalRegion({
            el: '#modal'
        }),
        notificationsRegion: '#notifications'
    });

    Bongo.addInitializer(function() {
        Backbone.history.start();
        Bongo.notificationsRegion.show(new NotificationsView({ collection: Bongo.notifications }));
    });

    return Bongo;
});