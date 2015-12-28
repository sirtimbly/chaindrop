var BoxItem = Marionette.ItemView.extend({
  initialize: function(){
      console.log("new box item added to page");
  },
  template: JST['boxItem']
});