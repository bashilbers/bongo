define([
    'app',
    'backbone.marionette',
    'views/layout/dashboard',
    'collections/Database',
    'views/collection/Database',
    'views/item/Header',
    'views/item/Sidebar',
    'collections/Host',
    'views/collection/Host',
    'views/item/HostForm',
    'models/Host',
    'views/layout/Modal'
], function(bongo, Marionette, DashboardLayout, DatabaseCollection, DatabaseListView, HeaderView, SidebarView, HostCollection, HostListView, FormView, HostModel, ModalLayout) {
    return Marionette.Controller.extend({
        initialize: function() {
            this.hostCollection = new HostCollection();

            this._layout = new DashboardLayout();
            this.appRegion = bongo.request('default:region');
            this.appRegion.show(this._layout);
            
            this._layout.headerRegion.show(new HeaderView());
            this._layout.sidebarRegion.show(new SidebarView());
        },

        listHosts: function() {
            this.hostCollection.fetch();
            var listView = new HostListView({ collection: this.hostCollection });
            this._layout.contentRegion.show(listView);
            listView.on('host:add', _.bind(this.showHostModal, this));

            listView.on('itemview:edit:model', _.bind(function(view) {
               this.showHostModal(view.model);
            }, this));

            listView.on('itemview:select:model', _.bind(function(view) {
                bongo.navigate('/hosts/' + view.model.id);
            }, this));
        },

        showHostModal: function(model) {
            this.hostCollection.fetch();
            var formView = new FormView({ model: model || new HostModel() });
            var modalRegion = bongo.request('modal:region') 

            formView.on('host:form:saved', _.bind(function(view) {
                if (!this.hostCollection.contains(view.model)) {
                    this.hostCollection.add(view.model);
                }
                
                view.model.save();
                modalRegion.close();
            }, this));

            modalRegion.show(formView);
        },

        listDatabases: function(hostId) {
            this.hostCollection.fetch({ success: _.bind(function() {
                var host = this.hostCollection.get(hostId);
                host.databases.fetch(); 
            }, this)});

            /*
            var collection = new DatabaseCollection();
            this._layout.contentRegion.show(new DatabaseListView({ collection: collection }));
            collection.fetch();
            */
        }
    });
});