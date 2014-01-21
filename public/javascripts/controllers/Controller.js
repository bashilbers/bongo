define([
    'app',
    'backbone.marionette',
    'views/layout/dashboard',
    'collections/Database',
    'views/collection/Database',
    'views/item/Header',
    'views/item/Sidebar'
], function(bongo, Marionette, DashboardLayout, Collection, ListView, HeaderView, SidebarView) {
    return Marionette.Controller.extend({
        initialize: function() {
            this._layout = new DashboardLayout();
            this.appRegion = bongo.request('default:region');
            this.appRegion.show(this._layout);
            
            this._layout.headerRegion.show(new HeaderView());
            this._layout.sidebarRegion.show(new SidebarView());
        },

        list: function() {
            var collection = new Collection();
            this._layout.contentRegion.show(new ListView({ collection: collection }));
            collection.fetch({ reset: true });

        }
    });
});