define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/wizardNavItem'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        className: 'wizard-nav-item',

        events: {
            'click a': 'navigate'
        },

        navigate: function(e) {
            e.preventDefault();
            this.trigger('click');
        }

        initialize: function() {
        	switch(this.model.get('state')) {
        		case 'already-visited':
        			this.$el.addClass('already-visited');
                    this.$el.removeClass('active');
        			break;

        		case 'active':
        			this.$el.addClass('active');
        			break;
        	};
        }
    });
});