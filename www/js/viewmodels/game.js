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
            const table = $$('<table class="panel-list"></table>');

            panels.forEach((line, y) => {
                const tr = $$('<tr>');
                line.forEach((panel, x) =>{
                    const td = $$(`<td class="panel-item" data-x="${x}" data-y="${y}"></td>`);
                    td.css('background-color', panel.isActive ? '#ffffff' : panel.color.rgb);
                    tr.append(td);
                });
                table.append(tr);
            });

            return table;
        }

        addClickEventPanels(callback) {
            $$('.panel-item').on('click', ele => {
                const item = $$(ele.target);
                const panel = this.game.panels[item.attr('data-y')][item.attr('data-x')];
                // if (panel.isActive) {
                callback(ele, item, panel);
                // }
            });
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
                this.doms.currentColor.text(game.currentColor.name);
                this.doms.currentColor.css('color', game.currentColor.rgb);
            }

            const panelBlock = this.createPanelBlock(this.game.panels);
            this.doms.panelListBlock.children().remove();
            this.doms.panelListBlock.append(panelBlock);
        }

        showStartTurnModal() {
            return new Promise(resolve => {
                this.f7App.alert(`プレイヤー: ${this.game.currentPlayer.name}`, `ターン ${this.game.turnIndex + 1}`, resolve);
            });
        }

        showPlayerTurnModal() {
            return new Promise(resolve => {
                this.f7App.alert('パネルを選択してください', `プレイヤー(${this.game.currentPlayer.name})の番です。`, resolve);
            });
        }

        showSelectPanelSuccessModal(selectPanel) {
            const game = this.game;
            return new Promise(resolve => {
                this.f7App.alert(`
プレイヤー: ${game.currentPlayer.name}<br>ターン ${game.turnIndex + 1}<br>
選択:<span class="color-${selectPanel.color.name}">${selectPanel.color.name}</span><br>
正解:<span class="color-${game.currentColor.name}">${game.currentColor.name}</span>`, '成功', resolve);
                $$('.modal-title').addClass('select-success-modal');
            });
        }

        showSelectPanelFailModal(selectPanel) {
            const game = this.game;
            return new Promise(resolve => {
                this.f7App.alert(`
プレイヤー: ${game.currentPlayer.name}<br>
ターン ${game.turnIndex + 1}<br>
選択:<span class="color-${selectPanel.color.name}">${selectPanel.color.name}</span><br>
正解:<span class="color-${game.currentColor.name}">${game.currentColor.name}</span>`, '失敗', resolve);
                $$('.modal-title').addClass('select-fail-modal');
            });
        }

        showSelectColorFailModal(selectColor) {
            const game = this.game;
            return new Promise(resolve => {
                this.f7App.alert(`
ゲームマスター: ${game.gameMaster.name}<br>
ターン ${game.turnIndex + 1}<br>
<span class="color-${selectColor.name}">${selectColor.name} パネルはもうありません！</span>`, '失敗', resolve);
                $$('.modal-title').addClass('select-fail-modal');
            });
        }

        showSelectColorPopup() {
            return new Promise((resolve) => {
                const popup = Game.templatePopupTemplate(this.game);
                this.f7App.pickerModal(popup);

                $$('.select-color-popup').find('.select-color-item').on('click', ele => {
                    const colorName = $$(ele.target).attr('data-color-name');
                    this.f7App.closeModal();
                    resolve(colorName);
                });
            });
        }

        showGameResult() {
            const game = this.game;
            return new Promise(resolve => this.f7App.alert(`${game.loser.name} が負け！`, '終わり！', resolve));
        }

        static get templatePopupTemplate() {
            return Template7.compile(`
<div class="picker-modal select-color-popup">
  <div class="content-block">
    <h2>ゲームマスター({{gameMaster.name}})の番です。</h2>
    <p>色を選択してください。</p>
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
