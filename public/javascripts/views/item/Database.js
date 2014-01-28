define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/database'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        tagName: "tr",
        
        template: template,

        events: {
            'click *[role="enter-context"]': 'triggerEnter',
            'click *[role="copy"]': 'triggerCopy',
            'click *[role="delete"]': 'triggerDrop',
            'click *[role="rename"]': 'triggerRename',
            'click *[role="getStats"]': 'triggerGetStats',
            'click *[role="repair"]': 'triggerRepair'
        },

        modelEvents: {
            'change': 'render'
        },

        triggerEnter: function(e) {
            e.preventDefault();
            this.trigger('select:model');
        },

        triggerCopy: function(e) {
            e.preventDefault();
            this.trigger('copy:model');
        },

        triggerRename: function(e) {
            e.preventDefault();
            this.trigger('rename:model');
        },

        triggerDrop: function(e) {
            e.preventDefault();
            this.trigger('delete:model');
        },

        triggerGetStats: function(e) {
            e.preventDefault();
            this.trigger('analyze:model');
        },

        triggerRepair: function(e) {
            e.preventDefault();
            this.trigger('repair:model');
        }
    });
});