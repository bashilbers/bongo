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
    'views/item/Confirmation',
    'controllers/BreadCrumb'
], function(bongo, Marionette, DashboardLayout, DatabaseCollection, DatabaseListView, HeaderView, 
    SidebarView, HostCollection, HostListView, FormView, HostModel, ConfirmationView, BreadCrumbController) {
    return Marionette.Controller.extend({
        initialize: function() {
            this.hostCollection = new HostCollection();

            this._layout = new DashboardLayout();
            this.appRegion = bongo.request('default:region');
            this.appRegion.show(this._layout);
            this.modalRegion = bongo.request('modal:region');

            bongo.reqres.setHandler('layout:get:breadcrumb:region', _.bind(function() {
                return this._layout.breadCrumbRegion;
            }, this));

            bongo.BreadCrumbController = new BreadCrumbController();
            
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
                bongo.navigate('/hosts/' + view.model.id + '/databases');
            }, this));
        },

        showHostModal: function(model) {
            this.hostCollection.fetch();
            var formView = new FormView({ model: model || new HostModel() });
            
            formView.on('host:form:saved', _.bind(function(view) {
                if (!this.hostCollection.contains(view.model)) {
                    this.hostCollection.add(view.model);
                }
                
                view.model.save();
                this.modalRegion.close();
            }, this));

            this.modalRegion.show(formView);
        },

        listDatabases: function(hostId) {
            this.hostCollection.fetch({ success: _.bind(function() {
                var host = this.hostCollection.get(hostId);
                var listView = new DatabaseListView({ collection: host.databases });
                this._layout.contentRegion.show(listView);
                host.databases.fetch();

                var confirm = new ConfirmationView();

                listView.on('itemview:drop', _.bind(function(view) {
                    this.modalRegion.show(confirm);

                    confirm.on('confirmed', _.bind(function() {
                        bongo.execute('alert', {
                            msg: 'Database ' + view.model.get('name') + ' dropped',
                            type: 'success'
                        });
                        this.modalRegion.close();
                }, this));
                }, this));
            }, this)});
        }
    });
});