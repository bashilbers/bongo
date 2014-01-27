define([
    'backbone',
    './../collections/Database'
], function(Backbone, DatabaseCollection) {
    return Backbone.Model.extend({
        initialize: function() {
            this.databases = new DatabaseCollection([], { host: this });
        },

        idAttribute: '_id',

        defaults: {
            host: 'mongodb://localhost',
            port: 27017
        },

        validation: {
            host: {
                required: true
            },
            port: {
                required: true
            }
        }
    });
});