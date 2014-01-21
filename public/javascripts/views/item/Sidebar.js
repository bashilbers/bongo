define([
    'backbone.marionette',
    'hbs!templates/item/sidebar'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
    	id: 'sidebar-wrapper',

        template: template
    });
});