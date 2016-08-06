(function (routes, models, viewmodels, $$) {
    routes.Game = (f7App, mainView, bgmController, seController) => {
        return (page) => {
            const game = page.query.game;
            const gameViewModel = new viewmodels.Game(f7App, mainView, page, game);
            gameViewModel.initGamePage();
            game.gameStart();

            bgmController.start('memorize');
            startMemorizePhase().then(() => {
                bgmController.start('main');
                seController.start('gameStart');
                return turnLoop();
            }).catch(() => {
                if ([models.GameStatus.LOSE_GAME_MASTER, models.GameStatus.LOSE_PLAYER].includes(game.status)) {
                    return gameViewModel.showGameResult();
                } else {
                    return Promise.reject();
                }
            }).then(() => {
                return mainView.router.load({url: 'result.html', query: {game}, context: {game}});
            }).catch(e => {
                console.error(e && (e.stack || e));
            });

            function startMemorizePhase(){
                game.fillPanelActive(false);
                gameViewModel.updatePage();
                return new Promise(resolve => {
                    setTimeout(() => {
                        game.fillPanelActive(true);
                        gameViewModel.updatePage();
                        resolve();
                    }, 5000);
                });
            }

            function turnLoop() {
                return startTurn().then(() => {
                    seController.start('turnStart');
                    return turnLoop();
                });
            }

            function startTurn() {
                return gameViewModel.showStartTurnModal().then(() => {
                    gameViewModel.updatePage();
                    return startGameMasterTurn();
                }).then(() => {
                    gameViewModel.updatePage();
                    return startPlayerTurn();
                }).then(() => {
                });
            }

            function startGameMasterTurn() {
                return new Promise((resolve, reject) => {
                    gameViewModel.showSelectColorPopup().then(selectedColorName => {
                        seController.start('selectColor');
                        const color = game.colors.find(color => color.name === selectedColorName);
                        if (game.selectColor(color)) {
                            resolve();
                        } else {
                            seController.start('incorrect');
                            gameViewModel.showSelectColorFailModal(color).then(reject, reject);
                        }
                    });
                });
            }

            function startPlayerTurn() {
                return gameViewModel.showPlayerTurnModal().then(() => {
                    return waitSelectPanel();
                });
            }

            function waitSelectPanel() {
                let first = true;
                return new Promise((resolve, reject) => {
                    gameViewModel.addClickEventPanels((ele, item, panel) => {
                        if (!first) { return; }
                        first = false;
                        const result = game.selectPanel(panel);
                        gameViewModel.updatePage();
                        if (result) {
                            seController.start('correct');
                            gameViewModel.showSelectPanelSuccessModal(panel).then(resolve, reject);
                        } else {
                            seController.start('incorrect');
                            gameViewModel.showSelectPanelFailModal(panel).then(reject, reject);
                        }
                    });
                });
            }
        };

    };


}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
