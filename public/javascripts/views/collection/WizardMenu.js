define([
    'backbone.marionette', 
    './../item/WizardNavItem'
], function(Marionette, ItemView) {
    return Marionette.CollectionView.extend({
        itemView: ItemView,
        tagName: 'ul',
        className: 'nav wizard-nav-list'
    });
});