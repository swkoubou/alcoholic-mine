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

            return table;
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
            this.doms.panelListBlock.children().remove();
            this.doms.panelListBlock.append(panelBlock);
        }
        
        showStartTurnModal(turnIndex, currentPlayerName) {
            this.f7App.alert(`プレイヤー: ${currentPlayerName}`, `ターン ${turnIndex}`);
        }

        showResultSuccessModal(selectedColor) {
            return new Promise(resolve => {
                this.f7App.alert(`
プレイヤー: ${this.currentPlayer.name}<br>ターン ${this.turnIndex + 1}<br>
選択:<span class="color-${selectedColor.name}">${selectedColor.name}</span><br>
正解:<span class="color-${this.currentColor.name}">${this.currentColor.name}</span>`, '成功', resolve);
                $$('.modal-title').addClass('select-success-modal');
            });
        }
        showResultFailModal(selectedColor) {
            return new Promise(resolve => {
                this.f7App.alert(`
プレイヤー: ${this.currentPlayer.name}<br>
ターン ${this.turnIndex + 1}<br>
選択:<span class="color-${selectedColor.name}">${selectedColor.name}</span><br>
正解:<span class="color-${this.currentColor.name}">${this.currentColor.name}</span>`, '失敗', resolve);
                $$('.modal-title').addClass('select-fail-modal');
            });
        }

        showSelectColorPopup() {
            return new Promise((resolve) => {
                const popup = Game.templatePopupTemplate(this.game);
                this.f7App.popup(popup);

                $$('.popup').find('.select-color-item').on('click', ele => {
                    const colorName = $$(ele.target).attr('data-color-name');
                    this.f7App.closeModal();
                    resolve(colorName);
                });
            });
        }

        static get templatePopupTemplate() {
            return Template7.compile(`
<div class="popup select-color-popup">
  <div class="content-block">
    <h2>ゲームマスター({{gameMaster.name}})は色を選択してください。</h2>
    <p class="select-color-list buttons-row">
      {{#each colors}}
      <span class="select-color-item button button-raised button-fill color-{{this.name}}" data-color-name="{{this.name}}">{{this.name}}</span>
      {{/each}}
    </p>
  </div>
</div>
`);
        }
    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
