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

        const gameViewModel = new viewmodels.Game(game, f7App, mainView);

        f7App.onPageInit('game', routes.Game(game, f7App));
    }

    app.initialize();

    //// tests ////

    function testGame(game) {
        // init
        console.log(`game master is ${game.gameMaster.name}`);
        console.log(`players is ${game.players.map(x => x.name)}`);
        game.gameStart();

        // first turn
        console.log('### first turn ###');
        console.log(`current player is ${game.currentPlayer.name}`);
        console.log(`game status is ${game.status}`);

        // game master will select color
        const selectColorResult = game.selectColor(_.sample(game.colors));
        console.log(`selected color is ${game.currentColor}`);
        console.log(`result of selectColor is ${selectColorResult}`);
        console.log(`game status is ${game.status}`);

        // player will select panel
        const selectPanel = _.sample(_.sample(game.panels));
        console.log(`selected panel is ${selectPanel}`);
        const selectPanelResult = game.selectPanel(selectPanel);
        console.log(`result of selectPanel is ${selectPanelResult}`);
        console.log(`game status is ${game.status}`);

        // second turn or result
        if (game.loser) {
            console.log('### game end ###');
            console.log(`loser is ${game.currentPlayer.name}`);
            console.log(`game status is ${game.status}`);
        } else {
            console.log('### second turn ###');
            console.log(`current player is ${game.currentPlayer.name}`);
            console.log(`game status is ${game.status}`);
        }
    }

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
