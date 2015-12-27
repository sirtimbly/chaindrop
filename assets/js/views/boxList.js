var BoxList = Marionette.CollectionView.extend({
  initialize: function(){
   
  },
  template: JST['boxList'],
  childView: BoxItem
});