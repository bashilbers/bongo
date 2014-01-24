define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/host'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        tagName: "tr",
        
        template: template,

        events: {
            'click *[role="enter-context"]': 'triggerEnter',
            'click *[role="edit"]': 'triggerEdit',
        	'click *[role="delete"]': 'triggerRemoval'
        },

        modelEvents: {
            'change': 'render'
        },

        triggerEnter: function(e) {
            e.preventDefault();
            this.trigger('select:model');
        },

        triggerEdit: function(e) {
            e.preventDefault();
            this.trigger('edit:model');
        },

        triggerRemoval: function(e) {
        	e.preventDefault();
        	this.model.destroy();
        }
    });
});