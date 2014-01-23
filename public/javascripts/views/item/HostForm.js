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
            inputHost: '#inputHost',
            inputPort: '#inputPort',
            inputUsername: '#inputUsername',
            inputPassword: '#inputPassword'
        },

        save: function(e) {
            e.preventDefault();

            this.model.set({
                host: this.ui.inputHost.val(),
                port: this.ui.inputPort.val(),
                inputUsername: this.ui.inputUsername.val(),
                inputPassword: this.ui.inputPassword.val()
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