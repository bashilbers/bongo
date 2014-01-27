define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/confirmation',
    'backbone'
], function(Marionette, template, Backbone) {
    return Marionette.ItemView.extend({
        initialize: function() {
            if (!this.model) {
                this.model = new Backbone.Model({
                    title: 'Are you sure?',
                    strong: 'Warning!',
                    description: 'You cannot undo this'
                })
            }
        },

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