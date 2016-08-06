(function (routes, models, viewmodels, $$) {
    routes.Game = (game, f7App) => {
        return (page) => {
            const gameViewModel = new viewmodels.Game(game, f7App, page);
            gameViewModel.initGamePage();
            game.gameStart();

            startMemorizePhase(game, gameViewModel).then(() => {
                return turnLoop(game, gameViewModel);
            }).catch(e => {
                if ([models.GameStatus.LOSE_GAME_MASTER, models.GameStatus.LOSE_PLAYER].includes(game.status)) {
                    return gameViewModel.showGameResult();
                } else {
                    console.error(e && (e.stack || e));
                }
            });
        };
    };

    function startMemorizePhase(game, gameViewModel){
        game.fillPanelActive(false);
        gameViewModel.updatePage();
        return new Promise(resolve => {
            setTimeout(() => {
                game.fillPanelActive(true);
                gameViewModel.updatePage();
                resolve();
            }, 4000);
        });
    }

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
        });
    }

    function startGameMasterTurn(game, gameViewModel) {
        return new Promise((resolve, reject) => {
            gameViewModel.showSelectColorPopup().then(selectedColorName => {
                const color = game.colors.find(color => color.name === selectedColorName);
                if (game.selectColor(color)) {
                    resolve();
                } else {
                    gameViewModel.showSelectColorFailModal(color).then(reject, reject);
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
                const result = game.selectPanel(panel);
                gameViewModel.updatePage();
                if (result) {
                    gameViewModel.showSelectPanelSuccessModal(panel).then(resolve, reject);
                } else {
                    gameViewModel.showSelectPanelFailModal(panel).then(reject, reject);
                }
            });
        });
    }

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
