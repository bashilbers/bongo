define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/document'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        tagName: "tr",
        
        template: template,

        events: {
            'click *[role="edit"]': 'triggerEdit',
            'click *[role="delete"]': 'triggerDrop'
        },

        triggerEdit: function(e) {
            e.preventDefault();
            this.trigger('edit:model');
        },

        triggerDrop: function(e) {
            e.preventDefault();
            this.trigger('drop');
        }
    });
});