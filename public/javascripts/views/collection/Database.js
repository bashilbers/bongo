define([
    'backbone.marionette', 
    './../item/Database',
    'hbs!templates/composite/database'
], function(Marionette, ItemView, template) {
    return Marionette.CompositeView.extend({
        itemView: ItemView,

        itemViewContainer: "tbody",

        template: template,

        events: {
            'click #mongoimport': 'initImport'
        },

        ui: {
            inputDatabase: '#inputDatabase',
            inputCollection: '#inputCollection',
            inputFile: '#inputFile'
        },

        initImport: function(e) {
            e.preventDefault();
            this.trigger('import:initialized', { 
                simpleData: {
                    'db': this.ui.inputDatabase.val(),
                    'collection': this.ui.inputCollection.val(),
                    'file': this.ui.inputFile.val()
                },
                formData: new FormData(this.$el.find('form')[0])
            });
        }
    });
});