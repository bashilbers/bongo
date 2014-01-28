define(['backbone', './../models/Database'], function(Backbone, DatabaseModel) {
    return Backbone.Collection.extend({
        initialize: function(models, options) {
            this.host = options.host;
        },

        url: function() {
            return this.host.url() + '/databases';
        },

        model: DatabaseModel
    });
});