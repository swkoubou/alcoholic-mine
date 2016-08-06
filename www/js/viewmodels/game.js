(function (models, viewmodels, $$) {
    class Game {
        constructor(game, f7App, page) {
            this.game = game;
            this.f7App = f7App;
            this.page = page;

            const container = $$(page.container);
            this.doms = {
                currentTurn: container.find('.current-turn'),
                maxTurn: container.find('.max-turn'),
                gameMasterName: container.find('.game-master-name'),
                turnPlayerName: container.find('.turn-player-name'),
                currentColor: container.find('.current-color'),
                panelListBlock: container.find('.panel-list-block')
            };
        }

        initGamePage() {
            this.updatePage();
        }

        createPanelBlock(panels) {
            const table = $$('<table>');

            panels.forEach(xs => {
                const tr = $$('<tr>');
                xs.forEach(xss =>{
                    const td = $$('<td>');
                    td.css('background-color',xss.color.rgb);
                    tr.append(td);
                });
                table.append(tr);
            });

            $$('.panel-block').append(table);
            $$('table').addClass('panels');
        }

        updatePage() {
            const game = this.game;
            this.doms.currentTurn.text(game.turnIndex + 1);
            this.doms.maxTurn.text(game.maxTurn);
            if (game.gameMaster) {
                this.doms.gameMasterName.text(game.gameMaster.name);
            }
            if (game.currentPlayer) {
                this.doms.turnPlayerName.text(game.currentPlayer.name);
            }
            if (game.currentColor) {
                this.doms.currentColor.text(game.currentColor.rgb);
                this.doms.currentColor.css('background-color', game.currentColor.rgb);
            }

            const panelBlock = this.createPanelBlock(this.game.panels);
            // this.doms.panelListBlock.children().remove();
            this.doms.panelListBlock.append(panelBlock);
        }
        
        showStartTurnModal(turnIndex, currentPlayerName) {
            this.f7App.alert('プレイヤー: '+currentPlayerName, 'ターン '+turnIndex);
        }
    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
