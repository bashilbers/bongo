define([
	'backbone',
    'underscore',
	'./../collections/Collection'
], function(Backbone, _, CollectionCollection) {
    return Backbone.Model.extend({
    	initialize: function(attrs, options) {
            this.collections = new CollectionCollection([], _.extend(options, { database: this }));
        },

        idAttribute: 'name'
    });
});