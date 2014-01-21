define([
  'jquery',
  'app',
  'routers/AppRouter',
  'controllers/Controller'
], function($, app, AppRouter, Controller) {
  $(function() {
  	app.appRouter = new AppRouter({
  		controller: new Controller
  	});
  	app.start();
  });
});