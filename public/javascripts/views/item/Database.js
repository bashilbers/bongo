define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/database'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
    	tagName: "tr",
    	
        template: template
    });
});