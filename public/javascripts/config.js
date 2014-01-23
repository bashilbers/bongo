/*
 * The configuration file for require.js holds all dependency declarations for
 * the application. This is the first file, that will be loaded by require.js
 * and it holds a reference to the main.js file, that starts the app itself.
 */
require.config({
  baseUrl: '/javascripts',

  // deps holds dependencies to load as soon as require is defined.
  //'utils'
  deps: ['jquery', 'underscore', 'bootstrap', 'main'],

  // Paths that contain the various different javascript files.
  paths: {
    // library paths.
    backbone: '../vendor/backbone-amd/backbone-min',
    jquery: '../vendor/jquery/jquery.min',
    underscore: '../vendor/underscore-amd/underscore-min',
    bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',

    // plugins
    unveil: '../vendor/unveil/jquery.unveil.min',
    "backbone.marionette": '../vendor/backbone.marionette/lib/core/amd/backbone.marionette.min',
    "backbone.marionette.subrouter": '../vendor/Marionette.SubRouter/backbone.marionette.subrouter.min',
    "backbone.localstorage": '../vendor/backbone.localstorage/backbone.localstorage',
    "backbone.wreqr": '../vendor/backbone.wreqr/lib/amd/backbone.wreqr.min',
    "backbone.babysitter": '../vendor/backbone.babysitter/lib/amd/backbone.babysitter.min',
    handlebars: '../vendor/handlebars/handlebars',
    hbs: '../vendor/require-handlebars-plugin/hbs',

    // non bower stuff
    utils: '../lib/utils'
  },
    
  /*
   * Configure the dependencies and exports for older, traditional
   * "browser globals" scripts that do not use define() to declare the
   * dependencies and set a module value.
   */  
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    
    jquery: {
      exports: 'jQuery'
    },

    unveil: {
      deps: ['jquery'],
      exports: 'jQuery'
    },

    underscore: {
      exports: '_'
    },

    handlebars: {
      exports: 'Handlebars'
    }
  }
});