var App = Marionette.Application.extend({
  initialize: function(options) {
    console.log('init up the js app');
  },
  allBoxes:null
});

var RootView = Marionette.LayoutView.extend({
  el: 'body',
  template: false,
  regions: {
      mainRegion: '.box-list',
      navRegion: '.nav-region',
      composerRegion: '.composer-region'
  }
});