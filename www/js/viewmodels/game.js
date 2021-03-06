(function (models, viewmodels, $$) {
    class Game {
        constructor(f7App, mainView, page, game) {
            this.f7App = f7App;
            this.mainView = mainView;
            this.page = page;
            this.game = game;

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
            const block = $$('<table class="panel-list"></table>');

            panels.forEach((line, y) => {
                const row = $$('<tr class="panel-row"></tr>');
                line.forEach((panel, x) =>{
                    const td = $$('<td class="panel-item-wrap"></td>');
                    const item = $$(`<span class="button button-raised button-fill panel-item" data-x="${x}" data-y="${y}"></span>`);
                    item.addClass(`color-${panel.isActive ? 'white' : panel.color.name}`);
                    td.append(item);
                    row.append(td);
                });
                block.append(row);
            });

            return block;
        }

        createLastResultPanelBlock(panels) {
            const block = $$('<table class="panel-list"></table>');

            panels.forEach(line => {
                const row = $$('<tr class="panel-row"></tr>');
                line.forEach(panel =>{
                    const td = $$('<td class="panel-item-wrap"></td>');
                    const item = $$(`<span class="button button-raised button-fill panel-item"></span>`);
                    item.addClass(`color-${panel.color.name}`);
                    if (panel.isActive) {
                        item.addClass('result-non-active');
                    }
                    if (panel === this.game.lastSelectPanel) {
                        item.addClass('last-panel-item');
                    }
                    td.append(item);
                    row.append(td);
                });
                block.append(row);
            });

            return block;
        }


        addClickEventPanels(callback) {
            $$('.panel-item').on('click', ele => {
                const item = $$(ele.target);
                const panel = this.game.panels[item.attr('data-y')][item.attr('data-x')];
                if (panel.isActive) {
                    callback(ele, item, panel);
                }
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
                // this.doms.currentColor.css('color', game.currentColor.rgb);
                this.doms.currentColor.css('color', '#ffffff');
                this.doms.currentColor.css('background-color', game.currentColor.rgb);
            } else {
                this.doms.currentColor.text('(none)');
                this.doms.currentColor.css('color', 'inherits');
            }

            const panelBlock = this.createPanelBlock(this.game.panels);
            this.doms.panelListBlock.children().remove();
            this.doms.panelListBlock.append(panelBlock);
        }

        showStartGameModal() {
            return new Promise(resolve => {
                this.f7App.alert(`
ゲームマスター: ${this.game.gameMaster.name}<Br>
プレイヤー: ${this.game.players.map(x => x.name)}
`, `ゲーム開始`, resolve);
            });
        }

        showPlayerTurnModal() {
            return new Promise(resolve => {
                this.f7App.alert('パネルを選択してください', `プレイヤー(${this.game.currentPlayer.name})の番です。`, resolve);
                $$('.modal').addClass('player-modal');
            });
        }

        showSelectPanelSuccessModal(selectPanel) {
            const game = this.game;
            return new Promise(resolve => {
                // 成功時はターンが先に進んでいるのでindex(1-index)-1 = index(0-index)を表示する
                this.f7App.modal({
                    title: '成功',
                    // 成功時はターンが先に進んでいるのでindex(1-index)-1 = index(0-index)を表示する
                    text: `プレイヤー: ${game.currentPlayer.name}<br>ターン ${game.turnIndex}<br>
選択:<span class="color-${selectPanel.color.name}">${selectPanel.color.name}</span><br>
正解:<span class="color-${game.currentColor.name}">${game.currentColor.name}</span>`,
                    buttons: [{
                        text: 'Next Stage',
                        onClick: resolve
                    }]
                });
                $$('.modal-title').addClass('select-success-modal');
                $$('.modal').addClass('correct-modal');
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
                $$('.modal').addClass('incorrect-modal');
            });
        }

        showSelectColorFailModal(selectColor) {
            const game = this.game;
            return new Promise(resolve => {
                this.f7App.alert(`
ゲームマスター: ${game.gameMaster.name}<br>
ターン ${game.turnIndex + 1}<br>
<span class="color-${selectColor.name}">${selectColor.name}</span> パネルはもうありません！`, '失敗', resolve);
                $$('.modal-title').addClass('select-fail-modal');
                $$('.modal').addClass('incorrect-modal');
            });
        }

        showMemorizeStartModal() {
            const game = this.game;
            return new Promise(resolve => {
                this.f7App.modal({
                    title: 'パネルの記憶フェーズを開始します。',
                    text: `制限時間は ${game.memorizeDuration}ms です。` ,
                    buttons: [{
                        text: 'Start',
                        onClick: resolve
                    }]
                });
            });
        }

        showSelectColorPopup() {
            return new Promise((resolve) => {
                const popup = Game.selectColorPopupTemplate(this.game);
                this.f7App.pickerModal(popup);

                $$('.select-color-popup').find('.select-color-item').on('click', ele => {
                    const colorName = $$(ele.target).attr('data-color-name');
                    this.f7App.closeModal();
                    resolve(colorName);
                });
            });
        }

        showLastResultPopup() {
            return new Promise((resolve) => {
                const panelBlock = this.createLastResultPanelBlock(this.game.panels)[0].outerHTML;
                const popup = Game.lastResultPopupTemplate({panelBlock});
                this.f7App.pickerModal(popup);
            });
        }

        static get selectColorPopupTemplate() {
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

        static get lastResultPopupTemplate() {
            return Template7.compile(`
<div class="picker-modal last-result-popup">
  <div class="content-block panel-list-block">
    {{panelBlock}}
  </div>
  <div class="content-block">
    <p><a href="#" class="close-picker">Close</a></p>
  </div>
</div>
`);
        }
    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
