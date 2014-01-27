define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/collection'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        tagName: "tr",
        
        template: template,

        events: {
            'click *[role="enter-context"]': 'triggerEnter',
            'click *[role="drop-database"]': 'triggerDrop'
        },

        triggerEnter: function(e) {
            e.preventDefault();
            this.trigger('select:model');
        },

        triggerDrop: function(e) {
            e.preventDefault();
            this.trigger('drop');
        }
    });
});