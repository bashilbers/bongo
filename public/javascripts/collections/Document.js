define(['backbone', './../models/Document'], function(Backbone, Model) {
    return Backbone.Collection.extend({
    	initialize: function(models, options) {
    		this.url = options.collection.url() + '/documents';
    	},

        model: Model
    });
});