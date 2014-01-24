define([
    'backbone.marionette', 
    './../item/BreadCrumb'
], function(Marionette, ItemView) {
    return Marionette.CollectionView.extend({
        itemView: ItemView,

        tagName: 'ol',

        className: 'breadcrumb'
    });
});