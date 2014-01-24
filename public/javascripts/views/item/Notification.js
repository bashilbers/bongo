define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/notification'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template
    });
});