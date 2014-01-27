define([
    'backbone.marionette',
    'hbs!/javascripts/templates/item/editor',
    'ace'
], function(Marionette, template) {
    return Marionette.ItemView.extend({
        tagName: 'pre',
        template: template,
        id: function() {
            return this.model.id;
        },

        initialize: function() {
            this.editor = ace.edit(this.el);
            this.editor.setTheme("ace/theme/monokai");
            this.session = this.editor.getSession();
            this.session.setMode('ace/mode/json');
        },

        onShow: function() {
            var docJSON = JSON.stringify(this.model.toJSON(), null, ' ');
            console.log(this.session);
            this.session.setValue(docJSON);

            console.log(this.session.getValue());
        }
    });
});