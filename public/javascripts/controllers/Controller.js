define([
    'app',
    'backbone.marionette',
    'views/layout/dashboard',
    'collections/Database',
    'views/collection/Database',
    'views/collection/Collection',
    'views/collection/Document',
    'views/item/Header',
    'views/item/Sidebar',
    'collections/Host',
    'views/collection/Host',
    'views/item/HostForm',
    'models/Host',
    'views/item/Confirmation',
    'controllers/BreadCrumb',
    'views/item/Editor'
], function(bongo, Marionette, DashboardLayout, DatabaseCollection, DatabaseListView, CollectionListView, DocumentListView, HeaderView, 
    SidebarView, HostCollection, HostListView, FormView, HostModel, ConfirmationView, BreadCrumbController, EditorView) {
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

            model = model || new HostModel;
            var formView = new FormView({ model: model });
            
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

                listView.on('itemview:delete:model', _.bind(function(view) {
                    this.modalRegion.show(confirm);

                    confirm.on('confirmed', _.bind(function() {
                        bongo.execute('alert', {
                            msg: 'Database ' + view.model.get('name') + ' dropped',
                            type: 'success'
                        });
                        view.model.destroy();
                        this.modalRegion.close();
                    }, this));
                }, this));

                listView.on('itemview:select:model', _.bind(function(view) {
                    bongo.navigate('/hosts/' + hostId + '/databases/' + view.model.id + '/collections');
                }, this));

                listView.on('itemview:copy:model', _.bind(function(view) {
                    var name = prompt('Enter destination name');
                    if (name === '') return;
                    $.ajax({
                        url: view.model.url() + '/actions/copy',
                        type: 'POST',
                        data: { toDb: name },
                        success: _.bind(function(xhr) {
                            host.databases.add({ _id: name });
                            bongo.execute('alert', {
                                msg: 'Database ' + view.model.get('name') + ' copied',
                                type: 'success'
                            });
                        }, this)
                    });
                }, this));

                listView.on('itemview:rename:model', _.bind(function(view) {
                    var name = prompt('Enter new name');
                    if (name === '') return;
                    $.ajax({
                        url: view.model.url() + '/actions/rename',
                        type: 'POST',
                        data: { toDb: name },
                        success: _.bind(function(xhr) {
                            bongo.execute('alert', {
                                msg: 'Database ' + view.model.get('name') + ' renamed to ' + name,
                                type: 'success'
                            });
                            view.model.set('name', name);
                        }, this)
                    });
                }, this));

                listView.on('itemview:repair:model', _.bind(function(view) {
                    var confirm = new ConfirmationView({
                        model: new Backbone.Model({
                            title: 'Are you sure?',
                            strong: 'Note',
                            description: 'When using journaling, there is almost never any need to run repairDatabase.' +
                                         'In the event of an unclean shutdown, the server will be able restore the data files to a pristine state automatically.'
                        })
                    });
                    this.modalRegion.show(confirm);
                }, this));

                listView.on('import:initialized', function(data) {
                    console.log(host.url());
                    console.log(data);

                    function progressHandlingFunction(e){
                        if(e.lengthComputable){
                            console.log(e.loaded, e.total);
                        }
                    }

                    $.ajax({
                        url: host.url() + '/import',
                        type: 'POST',
                        xhr: function() {
                            var myXhr = $.ajaxSettings.xhr();
                            if (myXhr.upload) { // Check if upload property exists
                                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                            }
                            return myXhr;
                        },
                        beforeSend: function() {},
                        success: function() {},
                        error: function() {},
                        data: data.formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    });
                });
            }, this)});
        },

        listCollections: function(hostId, databaseId) {
            this.hostCollection.fetch({ success: _.bind(function() {
                var host = this.hostCollection.get(hostId);

                host.databases.fetch({ success: _.bind(function() {
                    var database = host.databases.get(databaseId);

                    var listView = new CollectionListView({ collection: database.collections });
                    this._layout.contentRegion.show(listView);
                    database.collections.fetch();

                    var confirm = new ConfirmationView();

                    listView.on('itemview:drop', _.bind(function(view) {
                        this.modalRegion.show(confirm);

                        confirm.on('confirmed', _.bind(function() {
                            bongo.execute('alert', {
                                msg: 'Collection ' + view.model.get('name') + ' dropped',
                                type: 'success'
                            });
                            view.model.destroy();
                            this.modalRegion.close();
                        }, this));
                    }, this));

                    listView.on('itemview:select:model', _.bind(function(view) {
                        bongo.navigate('/hosts/' + hostId + '/databases/' + databaseId + '/collections/' + view.model.id + '/documents');
                    }, this));
                }, this)})
            }, this)});
        },

        listDocuments: function(hostId, databaseId, collectionId) {
            this.hostCollection.fetch({ success: _.bind(function() {
                var host = this.hostCollection.get(hostId);

                host.databases.fetch({ success: _.bind(function() {
                    var database = host.databases.get(databaseId);

                    database.collections.fetch({ success: _.bind(function() {
                        var collection = database.collections.get(collectionId);

                        var listView = new DocumentListView({ collection: collection.documents });
                        this._layout.contentRegion.show(listView);
                        collection.documents.fetch();

                        listView.on('itemview:edit:model', _.bind(function(view) {
                            this._layout.contentRegion.show(new EditorView({ model: view.model }));
                        }, this));
                    }, this)});
                }, this)});
            }, this)});
        }
    });
});