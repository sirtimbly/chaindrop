var Box = Backbone.Model.extend({
    defaults: {
            locationUrl:  "",
            size:         null
    }
});

var BoxCollection = Backbone.Collection.extend({
    url: '/box',
    comparator: 'createdAt'
});