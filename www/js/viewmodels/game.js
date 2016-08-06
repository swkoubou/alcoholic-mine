(function (models, viewmodels, $$) {
    class Game {
        constructor(game, f7App, page) {
            this.game = game;
            this.f7App = f7App;
        }

        initGamePage() {
            this.createPanelBlock(this.game.panels);
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

        showStartTurnModal(turnIndex, currentPlayerName) {
            this.f7App.alert('プレイヤー: '+currentPlayerName, 'ターン '+turnIndex);
        }
    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
