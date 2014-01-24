define([
    'backbone.marionette',
    'hbs!templates/layout/dashboard'
], function(Marionette, template) {
    return Marionette.Layout.extend({
        template: template,

        regions: {
            headerRegion: '#header',
            sidebarRegion: '#sidebar',
            breadCrumbRegion: '#breadcrumbs',
            contentRegion: '#content-view'
        }
    });
});