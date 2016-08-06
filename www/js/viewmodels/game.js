(function (models, viewmodels, $$) {
    class Game {
        constructor(game, f7App, page) {
            this.f7App = f7App;
        }

        initGamePage() {
            // ゲーム画面の初期化
            this.createPanelBlock();
        }

        createPanelBlock() {
            // game.panelsからパネルリストのhtmlを生成する
        }
        
        showStartTurnModal(turnIndex, currentPlayerName) {
            this.f7App.alert('プレイヤー: '+currentPlayerName, 'ターン '+turnIndex);
        }
    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
