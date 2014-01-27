define([
    'app',
    'backbone.marionette',
    'backbone',
    'underscore',
    'collections/BreadCrumb',
    'views/collection/BreadCrumb'
], function(bongo, Marionette, Backbone, _, BreadCrumbCollection, BreadCrumbsView) {
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

            var composed = '';
            _.each(parts, _.bind(function(val, i) {
                composed = (composed !== '' ? composed + '/' : composed) + val;

                var valid =  _.map(Backbone.history.handlers, function(handler) {
                    if (valid) return;
                    valid = val.match(handler.route);
                });

                if (valid) {
                    this.collection.add({
                        url: composed,
                        title: val
                    });
                }
            }, this));
        }
    });
});