var BoxCreator = Marionette.ItemView.extend({
    template: JST['boxCreator'],
    ui: {
        addBtn: "#add-btn",
        addressBox: "#addressee",
        bodyText: "#body"
    },
    events: {
        'click #add-btn': 'onAddBtnClick'
    },
    onAddBtnClick: function() {
        var addressee = this.ui.addressBox.val();
        var body = this.ui.bodyText.val();
        console.log("creating new box");
        this.collection.add({
            addressee: addressee,
            body: body
        });
        this.ui.addressBox.val('');
        this.ui.bodyText.val('');
    },
    onInputKeypress: function (e) {
			var ENTER_KEY = 13;
			var bodyTxt = this.ui.bodyText.val().trim();

			if (e.which === ENTER_KEY && bodyTxt) {
				this.onAddBtnClick();
			}
		}

})