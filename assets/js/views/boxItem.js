var BoxItem = Marionette.ItemView.extend({
  initialize: function(){
      console.log("new box item added to page");
  },
  el:'tr',
  template: JST['boxItem']
});