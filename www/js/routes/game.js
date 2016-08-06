(function (routes, viewmodels, $$) {
    routes.Game = (game, f7App) => {
        return (page) => {
            const gameViewModel = new viewmodels.Game(game, f7App, page);
            gameViewModel.initGamePage();

            game.gameStart();
            turnLoop(game, gameViewModel).catch(() => {
                return gameViewModel.showGameResult();
            });
        };
    };

    function turnLoop(game, gameViewModel) {
        return startTurn(game, gameViewModel).then(() => {
            return turnLoop(game, gameViewModel);
        });
    }

    function startTurn(game, gameViewModel) {
        return gameViewModel.showStartTurnModal().then(() => {
            gameViewModel.updatePage();
            return startGameMasterTurn(game, gameViewModel);
        }).then(() => {
            gameViewModel.updatePage();
            return startPlayerTurn(game, gameViewModel);
        }).then(() => {
            return gameViewModel.updatePage();
        });
    }

    function startGameMasterTurn(game, gameViewModel) {
        return new Promise((resolve, reject) => {
            gameViewModel.showSelectColorPopup().then(selectedColorName => {
                const color = game.colors.find(color => color.name === selectedColorName);
                if (game.selectColor(color)) {
                    resolve();
                } else {
                    gameViewModel.showSelectColorFailModal(color, reject);
                }
            });
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
                    gameViewModel.showSelectPanelSuccessModal(panel, resolve);
                } else {
                    gameViewModel.showSelectPanelFailModal(panel, reject);
                }
            });
        });
    }

}(alcoholicmine.routes, alcoholicmine.viewmodels, Dom7));