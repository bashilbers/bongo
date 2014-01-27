define(['backbone', './../models/Collection'], function(Backbone, CollectionModel) {
    return Backbone.Collection.extend({
    	initialize: function(models, options) {
    		this.url = options.database.url() + '/collections';
    	},

        model: CollectionModel
    });
});