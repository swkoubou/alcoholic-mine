(function (models) {
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
        alcoholicmine.data.currentGame = makeStubGame();
        console.log(alcoholicmine.data.currentGame);
    }

    function makeStubGame() {
        const game = new models.Game();
        const row = 5;
        const column = 5;
        const colors = ['#f44336', '#2196f3', '#4caf50'].map(x => new models.Color(x));
        game.createPanels(colors, row, column);
        return game;
    }

    app.initialize();
}(alcoholicmine.models));