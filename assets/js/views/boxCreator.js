var BoxCreator = Marionette.ItemView.extend({
    template: JST['boxCreator'],
    ui: {
        addBtn: "#add-btn",
        addressBox: "#addressee",
        bodyText: "#body",
        lookupBtn: "#lookup-btn",
        key: "#key",
        fingerprint: "#fingerprint",
        sealBtn: "#seal-btn"
    },
    events: {
        'click #add-btn': 'onAddBtnClick',
        "click @ui.lookupBtn": 'onLookupClick',
        "click @ui.sealBtn": 'onSealClick',
    },
    onAddBtnClick: function() {
        var addressee = this.ui.addressBox.val();
        var body = this.ui.bodyText.val();
        var context = this;
        console.log("creating new box");
        var box = new Box();
        box.save({
            addressee: addressee,
            body: body
        }, {success: function(model) {
            context.collection.add(model);
        }});
        
        this.ui.addressBox.val('');
        this.ui.bodyText.val('');
    },
    onInputKeypress: function (e) {
			var ENTER_KEY = 13;
			var bodyTxt = this.ui.bodyText.val().trim();

			if (e.which === ENTER_KEY && bodyTxt) {
				this.onAddBtnClick();
			}
		},
    onLookupClick: function() {
        var context = this;
        var addresseeName = this.ui.addressBox.val();
        $.getJSON('/addressee/lookupKeybasePrimary', {name: addresseeName}, function(data) {
           context.ui.key.val(data.bundle);
           context.ui.fingerprint.val(data.key_fingerprint);
        });
    },
    onSealClick: function() {
       this.trigger('show:message', this.ui.bodyText.val(), this.ui.key.val(), function(cipherTxt) {
           this.ui.bodyText.val(cipherText);
       });
    }

})