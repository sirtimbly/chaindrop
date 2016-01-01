var BoxItem = Marionette.ItemView.extend({
  initialize: function(){
      console.log("new box item added to page");
  },
  tagName: 'li',
  className: 'list-block__item',
  template: JST['boxItem']
});