define(['backbone.marionette', 'underscore'], function(Marionette, _) {
  return Marionette.Region.extend({
    constructor: function() {
      Marionette.Region.prototype.constructor.apply(this, arguments);
      this.ensureEl();
      this.$el.on('hidden.bs.modal', { region: this }, function(event) {
          event.data.region.close();
      });
    },

    onShow: function(view) {
      this.$el.modal('show');
    },
 
    onClose: function(){
      this.$el.modal('hide');
    }
  });
});