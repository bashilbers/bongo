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

            this.wizard.on('next', _.bind(function(next, curr) {
                this.$el.find('.progress-bar').css('width', (100/this.wizard.getSteps().length) + '%');
                curr.set('state', 'already-visited');
                this.renderStep(next);
            }, this));

            this.wizard.on('previous', _.bind(function(prev, curr) {
                curr.set('state', 'already-visited');
                this.renderStep(prev);
            }, this));

            this.menu = new WizardMenuView({ collection: this.wizard.getSteps(), wizard: this.wizard });
        },

        template: template,

        regions: {
            navRegion: '.wizard-nav-container',
            progressRegion: '.wizard-progress-container',
            contentRegion: '.wizard-card-container'
        },

        events: {
            'click *[role="back"]': 'back',
            'click *[role="next"]': 'next',
            'click *[role="submit"]': 'submit'
        },

        back: function() {
            this.wizard.previousStep();
        },

        next: function() {
            this.wizard.nextStep();
        },

        submit: function() {
            alert('submitted!?');
        },

        onRender: function() {
            this.renderCurrentStep();
        },

        renderCurrentStep: function() {
            this.renderStep(this.wizard.getCurrentStep()); 
        },

        renderStep: function(step) {
            step.set('state', 'active');
            this.contentRegion.show(step.get('view'));
            this.navRegion.show(this.menu);
        }
    });
});