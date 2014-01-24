define([
    'app',
    'backbone.marionette',
    'backbone',
    'collections/BreadCrumb',
    'views/collection/BreadCrumb'
], function(bongo, Marionette, Backbone, BreadCrumbCollection, BreadCrumbsView) {
    return Marionette.Controller.extend({
        initialize: function() {
            Backbone.history.on('route', _.bind(this.updateBreadCrumbs, this));
            this.collection = new BreadCrumbCollection();
            this.listView = new BreadCrumbsView({ collection: this.collection });

            bongo.request('layout:get:breadcrumb:region').show(this.listView);
        },

        updateBreadCrumbs: function() {
            this.collection.reset();

            var parts = Backbone.history.fragment.split('/');

            var c;
            _.each(parts, _.bind(function(val, i) {
                var composed = (composed ? composed + '/' : '') + val;

                console.log(composed, val);
                this.collection.add({
                    url: composed,
                    title: val
                });
            }, this));
        }
    });
});