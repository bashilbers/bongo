define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/sourceStep',
    'backbone'
], function(Marionette, template, Backbone) {
    return Marionette.ItemView.extend({
        template: template,

        className: 'wizard-card',

        onShow: function() {
        	this.$el.find('.fancy-select').selectize();
        }
    });
});