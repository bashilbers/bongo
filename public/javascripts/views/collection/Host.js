define([
    'backbone.marionette', 
    './../item/Host',
    'hbs!templates/composite/host'
], function(Marionette, ItemView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

        itemEvents: {
            'delete': function(event, view) {
                view.model.destroy();
             }
        },

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