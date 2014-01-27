define([
	'backbone.marionette', 
	'./../item/Document',
	'hbs!templates/composite/document'
], function(Marionette, ItemView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

        itemViewContainer: "tbody",

        template: template
    });
});