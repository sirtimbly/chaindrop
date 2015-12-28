var BoxList = Marionette.CollectionView.extend({
  initialize: function(){
   
  },
  template: JST['boxList'],
  childView: BoxItem,
  collectionEvents: {
    "add": "onItemAdded"
  },
  onItemAdded: function(item){
      item.save();
  }
});