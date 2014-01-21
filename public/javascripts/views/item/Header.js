define([
    'backbone.marionette',
    'hbs!templates/item/header'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template
    });
});