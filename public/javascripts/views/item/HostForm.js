define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/hostForm',
    'backbone'
], function(Marionette, template, Backbone) {
    return Marionette.ItemView.extend({
        template: template,

        events: {
            'click input[type="submit"]': 'save',
            'click input[name="cancel"]': 'cancel'
        },

        ui: {
            inputName: '#inputName',
            inputHost: '#inputHost',
            inputPort: '#inputPort',
            inputUsername: '#inputUsername',
            inputPassword: '#inputPassword',
            inputDefaultDb: '#inputDefaultDatabase'
        },

        save: function(e) {
            e.preventDefault();

            this.model.set({
                name: this.ui.inputName.val(),
                host: this.ui.inputHost.val(),
                port: this.ui.inputPort.val(),
                inputUsername: this.ui.inputUsername.val(),
                inputPassword: this.ui.inputPassword.val(),
                defaultDatabase: this.ui.inputDefaultDb.val()
            });

            if(this.model.isValid(true)) {
                this.trigger('host:form:saved', this);
            }
        },

        cancel: function(e) {
            this.trigger('host:form:canceled');
        }
    });
});