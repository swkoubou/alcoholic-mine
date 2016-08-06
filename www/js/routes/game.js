(function (routes, viewmodels, $$) {
    routes.Game = (game, f7App) => {
        return (page) => {
            const gameViewModel = new viewmodels.Game(game, f7App, page);
            gameViewModel.initGamePage();

            game.gameStart();

            gameViewModel.showStartTurnModal().then(() => {
                gameViewModel.updatePage();
                return gameViewModel.showSelectColorPopup();
            }).then(selectedColorName => {
                const color = game.colors.find(color => color.name === selectedColorName);
                game.selectColor(color);
                gameViewModel.updatePage();
                return gameViewModel.showPlayerTurnModal();
            });
        };
    };
}(alcoholicmine.routes, alcoholicmine.viewmodels, Dom7));