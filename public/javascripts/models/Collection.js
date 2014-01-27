define([
    'backbone',
    'underscore',
    './../collections/Document'
], function(Backbone, _, DocumentCollection) {
    return Backbone.Model.extend({
        initialize: function(attrs, options) {
            this.documents = new DocumentCollection([], _.extend(options, { collection: this }));
        },
        idAttribute: 'name'
    });
});