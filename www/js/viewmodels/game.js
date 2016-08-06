(function (models, viewmodels, $$) {
    class Game {
        constructor(game, page) {
            this.game = game;
            console.log($$(page.container));
            // 初期化処理
        }

        initGamePage() {
            // ゲーム画面の初期化
            this.createPanelBlock(this.game.panels);
        }

        createPanelBlock(panels) {
            console.log(panels);
            console.log(panels);
            // game.panelsからパネルリストのhtmlを生成する
            const table = $$('<table>');

            // (args) => { // process }
            //
            //
            panels.forEach(xs => {
                // console.log(xs);
                const tr = $$('<tr>');
                xs.forEach(xss =>{
                    const td = $$('<td>');
                    td.css('background-color',xss.color.rgb);
                    console.log(xss.color.rgb);
                    tr.append(td);
                });
                table.append(tr);
            });

            // panels.forEach(function (xs) {
            //
            // });

            // for(var i=0;i<5;i++){
            //     const tr = $$('<tr>');
            //     for(var j=0;j<5;j++){
            //         const td = $$('<td>');
            //         // td.css('backgrounc-color',)
            //         tr.append(td);
            //     }
            //     table.append(tr);
            // }
            $$('.panel-block').append(table);
            $$('table').addClass('panels');
        }


    }

    viewmodels.Game = Game;

}(alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
