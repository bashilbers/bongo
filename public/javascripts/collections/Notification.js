define([
    'backbone', 
    './../models/Notification'
], function(Backbone, Model) {
    return Backbone.Collection.extend({
        model: Model
    });
});