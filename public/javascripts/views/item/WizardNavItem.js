define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/wizardNavItem'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        className: 'wizard-nav-item',

        initialize: function() {
        	switch(this.model.get('state')) {
        		case 'already-visited':
        			this.$el.addClass('already-visited');
        			break;

        		case 'active':
        			this.$el.addClass('active');
        			break;
        	};
        }
    });
});