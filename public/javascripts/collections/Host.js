define([
    'backbone', 
    './../models/Host'
], function(Backbone, Model) {
    return Backbone.Collection.extend({
        model: Model,
        url: '/api/hosts'
    });
});