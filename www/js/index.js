(function () {
    const app = {
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
            appInit();
        }
    };
    const $$ = Dom7;

    function appInit() {
        const f7App = new Framework7({
            material: true
        });

        mainView = myApp.addView('.view-main', {});

        alcoholicmine.data.f7App = f7App;
    }

    app.initialize();
}());