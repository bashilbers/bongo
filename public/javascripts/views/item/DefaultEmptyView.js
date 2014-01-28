define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/defaultEmptyView'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,

        tagName: 'tr'
    });
});