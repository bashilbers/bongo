define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/dataStep',
    'backbone'
], function(Marionette, template, Backbone) {
    return Marionette.ItemView.extend({
        template: template,

        className: 'wizard-card'
    });
});