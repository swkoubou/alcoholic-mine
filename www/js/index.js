(function (models, viewmodels, routes) {
    const app = {
        initialize: () => { document.addEventListener('deviceready', this.onDeviceReady, false); },
        onDeviceReady: () => {
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
            material: true,
            template7Pages: true,
            precompileTemplates: true
        });
        registerTemplateHelper();
        const mainView = f7App.addView('.view-main', {});

        const bgmController = new models.BgmController();
        bgmController
            .addBgm('main', 'sound/bgm/main.wav')
            .addBgm('result', 'sound/bgm/result.mp3')
            .addBgm('memorize', 'sound/bgm/thinking.wav')
            .allPreload()
            .then(() => {
                bgmController.start('main');
            })
            .catch(e => console.error(e && (e.stack || e)));

        f7App.onPageInit('game', routes.Game(f7App, mainView, bgmController));
        f7App.onPageInit('result', routes.Result(f7App, mainView, bgmController));

        const game = makeStubGame();
        setTimeout(() => mainView.router.load({url: 'game.html', query: {game}, context: {game}}), 3000);
    }

    function registerTemplateHelper() {
        Template7.registerHelper('ifeq', function (a, b, opts) {
            a === b ? opts.fn(this, opts.data) : opts.inverse(this, opts.data);
        })
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
