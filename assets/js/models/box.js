var Box = Backbone.Model.extend({
    url: '/box',
    defaults: {
        'size': '0'
    }
});

var BoxCollection = Backbone.Collection.extend({
    url: '/box'
});