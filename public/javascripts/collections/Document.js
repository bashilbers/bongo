define(['backbone', './../models/Document'], function(Backbone, Model) {
    return Backbone.Collection.extend({
    	initialize: function(models, options) {
    		this.collection = options.collection;
    	},

        url: function() {
            return this.collection.url() + '/documents';
        },

        model: Model
    });
});