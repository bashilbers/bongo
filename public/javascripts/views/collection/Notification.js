define([
    'backbone.marionette', 
    './../item/Notification'
], function(Marionette, ItemView) {
    return Marionette.CollectionView.extend({
        itemView: ItemView
    });
});