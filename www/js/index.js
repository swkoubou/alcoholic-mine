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

    if (typeof cordova === "undefined") {
        app.onDeviceReady();
    } else {
        app.initialize();
    }

    function appInit() {
        const f7App = new Framework7({
            material: true
        });
        const $$ = Dom7;

        mainView = f7App.addView('.view-main', {});

        alcoholicmine.data.f7App = f7App;
        alcoholicmine.data.mainView = mainView;
    }

    app.initialize();
}());