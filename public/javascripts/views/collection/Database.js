define([
	'backbone.marionette', 
	'./../item/Database',
	'hbs!templates/composite/database'
], function(Marionette, ItemView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

        itemViewContainer: "tbody",

        template: template
    });
});