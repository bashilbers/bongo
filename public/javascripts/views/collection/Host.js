define([
    'backbone.marionette', 
    './../item/Host',
    './../item/DefaultEmptyView',
    'hbs!templates/composite/host'
], function(Marionette, ItemView, defaultEmptyView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

        emptyView: defaultEmptyView,

        itemViewContainer: "tbody",

        template: template,

        ui: {
        	addHostButton: '#addHost'
        },

        events: {
        	'click #addHost': 'addHost'
        },

        addHost: function(e) {
        	this.trigger('host:add');
        }
    });
});