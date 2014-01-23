define([
    'backbone.marionette',
    'hbs!templates/layout/bootstrapModal'
], function(Marionette, template) {
    return Marionette.Layout.extend({
        template: template,

        regions: {
            headerRegion: '.modal-header',
            sidebarRegion: '.modal-body',
            contentRegion: '.modal-footer'
        }
    });
});