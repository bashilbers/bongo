define(['backbone', './../models/Collection'], function(Backbone, CollectionModel) {
    return Backbone.Collection.extend({
    	initialize: function(models, options) {
    		this.database = options.database;
    	},

        url: function() {
            return this.database.url() + '/collections';
        },

        model: CollectionModel
    });
});