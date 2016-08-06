(function (routes, viewmodels, $$) {
    routes.Game = (game, f7App) => {
        return (page) => {
            const gameViewModel = new viewmodels.Game(game, f7App, page);
            gameViewModel.initGamePage();

            game.gameStart();

            // start turn
            gameViewModel.showStartTurnModal().then(() => {
                gameViewModel.updatePage();
                return startGameMasterTurn(game, gameViewModel);
            }).then(() => {
                gameViewModel.updatePage();
                return startPlayerTurn(game, gameViewModel);
            }).then(() => {
                return gameViewModel.updatePage();
            }, (panel) => {
                console.error('reject', e);
            });
        };
    };

    function startGameMasterTurn(game, gameViewModel) {
        return gameViewModel.showSelectColorPopup().then(selectedColorName => {
            const color = game.colors.find(color => color.name === selectedColorName);
            const result = game.selectColor(color);
            return result;
        });
    }

    function startPlayerTurn(game, gameViewModel) {
        return gameViewModel.showPlayerTurnModal().then(() => {
            return waitSelectPanel(game, gameViewModel);
        });
    }

    function waitSelectPanel(game, gameViewModel) {
        let first = true;
        return new Promise((resolve, reject) => {
            gameViewModel.addClickEventPanels((ele, item, panel) => {
                if (!first) { return; }
                first = false;
                if (game.selectPanel(panel)) {
                    gameViewModel.showResultSuccessModal(panel.color, resolve);
                } else {
                    gameViewModel.showResultFailModal(panel.color, reject);
                }
            });
        });
    }

}(alcoholicmine.routes, alcoholicmine.viewmodels, Dom7));