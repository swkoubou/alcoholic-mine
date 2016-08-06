(function (models, viewmodels, routes) {
    const app = {
        initialize: () => { document.addEventListener('deviceready', this.onDeviceReady, false); },
        onDeviceReady: () => { appInit(); }
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
        const game = alcoholicmine.data.currentGame = makeStubGame();
        // testGame(game);

        mainView = f7App.addView('.view-main', {});

        alcoholicmine.data.f7App = f7App;
        alcoholicmine.data.mainView = mainView;

        f7App.onPageInit('game', routes.Game(game, f7App));
        f7App.onPageInit('result', routes.Result(game, f7App));
    }

    app.initialize();

    //// tests ////

    function makeStubGame() {
        const colors = [['red', '#f44336'], ['blue', '#2196f3'], ['green', '#4caf50']].map(x => new models.Color(...x));
        const users = ['nakazawa', 'kikuchi', 'nishi'].map(x => new models.User(x));
        const game = new models.Game();
        users.forEach(user => game.addUser(user));
        game.setGameMaster(_.sample(users));
        game.createPanels(colors, 5, 5);
        return game;
    }

    app.initialize();
}(alcoholicmine.models, alcoholicmine.viewmodels, alcoholicmine.routes));
