define(['backbone', './../models/Database'], function(Backbone, DatabaseModel) {
    return Backbone.Collection.extend({
        model: DatabaseModel
    });
});