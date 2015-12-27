$(function(){
    var app = new App();
    app.start();
    app.rootView = new RootView();
    app.rootView.render();
    app.allBoxes = new BoxCollection();
    app.allBoxes.fetch({
        success: function(collection){
            console.log(collection);
            app.rootView.mainRegion.show(new BoxList({collection: collection}));
        }, 
        error: function(collection, response){
            console.log('error fetching boxes: ' + response);
        }
    })
    
});