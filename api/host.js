var api = function(db) {
    var collection = db.collection('hosts');
    return {
        find: function(id, callback) {
            collection.findById(id, callback);
        },

        findAll: function(callback) {
            collection.findItems(callback);
        },

        create: function(doc, callback) {
            collection.insert(doc, callback);
        },

        update: function(id, doc, callback) {
            console.log('updating host: ', doc);
            delete doc._id;
            collection.updateById(id, doc, {}, callback);
        },

        remove: function(id, callback) {
            collection.removeById(id, callback);
        }
    };
}

module.exports = api;