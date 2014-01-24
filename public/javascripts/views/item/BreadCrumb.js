define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/breadCrumb'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        tagName: 'li'
    });
});