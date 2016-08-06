(function (routes, viewmodels, $$) {
    routes.Game = (game, f7App) => {
        return (page) => {
            const GameViewModel = new viewmodels.Game(game, f7App, page);
            GameViewModel.initGamePage();

            game.gameStart();

            // ターン開始ごとに `GameViewModel.updatePage()`
            GameViewModel.showSelectColorPopup();
        };
    };
}(alcoholicmine.routes, alcoholicmine.viewmodels, Dom7));