var curvelock = require('../../lib/curvelock.js');

var App = Marionette.Application.extend({
  initialize: function(options) {
    console.log('init up the js app');
  },
  allBoxes:null,
  childEvents: {
    'seal:text': 'encryptTextToId'
  },
  encryptTextToId: function(msg, toId, callback) {
      var cText = curvelock.encryptMessage(msg, toId);
      callback(cText);
  },
  decryptTextWithPrivateKey: function(msg, key) {
      
  },
  unlockPrivateKey: function(seed, email, password){
      
  },
  promptForCredentials: function() {
      
  }
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