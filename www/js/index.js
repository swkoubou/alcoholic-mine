var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    onDeviceReady: function() {
        app.receivedEvent();
    },

    receivedEvent: function() {
        // initialize
    }
};

app.initialize();