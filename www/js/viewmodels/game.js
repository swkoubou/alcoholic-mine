(function (models, viewmodels, $$) {
    class Game {
        constructor(game, page) {
            console.log($$(page.container));
            // 初期化処理
        }
        initGamePage() {
            // ゲーム画面の初期化
            this.createPanelBlock();
        }
        createPanelBlock() {
            // game.panelsからパネルリストのhtmlを生成する
        }
    }
    viewmodels.Game = Game;
}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));