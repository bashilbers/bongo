define([
    'backbone.marionette', 
    './../item/Host',
    'hbs!templates/composite/host'
], function(Marionette, ItemView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

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