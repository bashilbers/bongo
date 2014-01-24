define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/database'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        tagName: "tr",
        
        template: template,

        events: {
            'click *[role="drop-database"]': 'triggerDrop'
        },

        triggerDrop: function(e) {
            e.preventDefault();
            this.trigger('drop');
        }
    });
});