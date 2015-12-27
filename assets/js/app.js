var App = Marionette.Application.extend({
  initialize: function(options) {
    console.log('init up the js app');
  }
});

var RootView = Marionette.LayoutView.extend({
  el: 'body',
  template: false,
  regions: {
      mainRegion: '.main-region',
      navRegion: '.nav-region'
  }
});