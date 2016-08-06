(function (routes, viewmodels, $$) {
    routes.Game = (game, f7App) => {
        return (page) => {
            const GameViewModel = new viewmodels.Game(game, f7App, page);
            GameViewModel.initGamePage();

            GameViewModel.viewMemorizePhase();

            // ターン開始ごとに `GameViewModel.updatePage()`
        };
    };
}(alcoholicmine.routes, alcoholicmine.viewmodels, Dom7));
