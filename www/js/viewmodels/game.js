(function (models, viewmodels, $$) {
    class Game {
        constructor(game, f7App, page) {
          this.f7App = f7App;
        }
        
        showStartTurnModal(turnIndex, currentPlayerName) {
          this.f7App.alert(`プレイヤー: ${currentPlayerName}`, `ターン ${turnIndex}`);
        }
        
        showResultSuccessModal(turnIndex,currentPlayerName,color) {
          this.f7App.alert(`プレイヤー: ${currentPlayerName}`+ `<br>ターン ${turnIndex}<br>`+`選択:<span class="bg-blue">　　</span><br>`+`正解:<span class="bg-blue"> </span>`, '成功');
          $$('.modal-title').addClass('select-success-modal');
        }
        showResultFailModal(turnIndex,currentPlayerName,color) {
          this.f7App.alert(`プレイヤー: ${currentPlayerName}<br>`+ `ターン ${turnIndex}<br>`+`選択:<span class="color-blue">blue</span><br>`+`正解:<span class="bg-blue"> </span>`, '失敗'); 
          $$('.modal-title').addClass('select-fail-modal');
        }
        
    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
