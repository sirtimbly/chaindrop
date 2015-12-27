var BoxItem = Marionette.ItemView.extend({
  initialize: function(){
      console.log("new box item added");
  },
  template: JST['boxItem']
});