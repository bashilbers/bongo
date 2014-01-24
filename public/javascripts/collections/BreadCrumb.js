define([
    'backbone', 
    './../models/BreadCrumb'
], function(Backbone, Model) {
    return Backbone.Collection.extend({
        model: Model
    });
});