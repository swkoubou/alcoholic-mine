(function (routes, models, viewmodels, data, $$) {
    routes.Index = (f7App, mainView, bgmController, seController) => {
        return (page) => {
            bgmController.start('main');

            $$('.back-title-link').removeClass('visible');

            $$(page.container).find('.start-link').on('click', () => {
                const game = makeGame();
                mainView.router.load({url: 'game.html', query: {game}, context: {game}})
            });

            $$(page.container).find('.settings-link').on('click', () => {
                mainView.router.load({url: 'settings.html', context: {settings: data.settings}});
            });
        };
    };

    function makeGame() {
        const settings = data.settings;
        const game = new models.Game({memorizeDuration: settings.memorizeDuration});
        const colors = data.defaultColors.slice(0, settings.colorNumber).map(x => new models.Color(...x));
        const users = _.shuffle(settings.users.split(',')).map(x => new models.User(x));
        users.forEach(user => game.addUser(user));
        game.setGameMaster(_.sample(users));
        game.createPanels(colors, settings.panelRow, settings.panelColumn);
        return game;
    }

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, alcoholicmine.data, Dom7));
