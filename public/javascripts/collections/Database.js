define(['backbone', './../models/Database'], function(Backbone, DatabaseModel) {
    return Backbone.Collection.extend({
    	initialize: function(models, options) {
    		this.url = options.host.url() + '/databases';
    	},

        model: DatabaseModel
    });
});