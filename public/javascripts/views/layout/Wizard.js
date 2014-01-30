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
                var progressedSteps = this.wizard.getSteps().filter(function(step) {
                    return (step.get('state') === 'already-visited' || step.get('state') === 'active') ? true : false;
                });

                this.$el.find('.progress-bar').css('width', ((100/this.wizard.getSteps().length) * progressedSteps.length) + '%');
                curr.set('state', 'already-visited');
                this.renderStep(next);
            }, this));

            this.wizard.on('previous', _.bind(function(prev, curr) {
                curr.set('state', 'already-visited');
                this.renderStep(prev);
            }, this));

            this.menu = new WizardMenuView({ collection: this.wizard.getSteps(), wizard: this.wizard });

            this.menu.on('itemview:click', _.bind(function(view) {
                if(view.model.get('state') !== 'already-visited') return;

                this.wizard.getCurrentStep().set('state', 'already-visited');
                this.wizard.setCurrentStep(view.model);
                this.renderCurrentStep();
            }, this));
        },

        template: template,

        regions: {
            navRegion: '.nav',
            contentRegion: '.content'
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

        renderFirstStep: function(step) {
            this.$el.find('*[role="back"]').addClass('hidden');
        },

        renderLastStep: function(step) {
            this.$el.find('*[role="next"]').addClass('hidden');
            this.$el.find('*[role="submit"]').removeClass('hidden');
        },

        renderStep: function(step) {
            if (step === this.wizard.getSteps().first())
                this.renderFirstStep();
            
            if (step === this.wizard.getSteps().last())
                this.renderLastStep();

            step.set('state', 'active');
            this.contentRegion.show(step.get('view'));
            this.navRegion.show(this.menu);
        }
    });
});