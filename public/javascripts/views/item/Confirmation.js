define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/confirmation',
    'backbone'
], function(Marionette, template, Backbone) {
    return Marionette.ItemView.extend({
        template: template,

        events: {
            'click *[role="confirm"]': 'confirmed'
        },

        confirmed: function(e) {
            e.preventDefault();
            this.trigger('confirmed');
        }
    });
});