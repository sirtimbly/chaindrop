var BoxList = Marionette.CollectionView.extend({
  initialize: function(){
   
  },
  tagName: 'ul',
  className: 'list-block',
  template: JST['boxList'],
  childView: BoxItem,
  childViewContainer: ".box-list"
});