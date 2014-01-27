define([
	'backbone.marionette', 
	'./../item/Collection',
	'hbs!templates/composite/collection'
], function(Marionette, ItemView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

        itemViewContainer: "tbody",

        template: template
    });
});