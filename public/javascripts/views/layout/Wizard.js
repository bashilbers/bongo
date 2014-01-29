define([
    'backbone.marionette',
    'hbs!/javascripts/templates/layout/wizard',
    'backbone',
    'views/collection/WizardMenu'
], function(Marionette, template, Backbone, WizardMenuView) {
    return Marionette.Layout.extend({
        initialize: function(options) {
            this.wizard = options.wizard;

            this.model = new Backbone.Model({
                title: options.title,
                subtitle: options.subtitle
            });

            if(!this.wizard.getCurrentStep().get('state')) {
                this.wizard.getCurrentStep().set('state', 'active');
            }
        },

        template: template,

        regions: {
            navRegion: '.wizard-nav-container',
            progressRegion: '.wizard-progress-container',
            contentRegion: '.wizard-card-container'
        },

        onRender: function() {
            this.navRegion.show(new WizardMenuView({ collection: this.wizard.getSteps() }));
            this.contentRegion.show(this.wizard.getCurrentStep().get('view')); 
        }
    });
});