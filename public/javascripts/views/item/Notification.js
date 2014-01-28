define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/notification'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template

        /*,

        events: {
        	'click .close': 'fadeAndDestroy'
        },

        fadeAndDestroy: function() {
        	this.$el.fadeOut(100, _.bind(this.close, this));
        	return false;
        }
        */
    });
});