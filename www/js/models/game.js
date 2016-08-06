(function (models) {
    const GameStatus = models.GameStatus;
    const Panel = models.Panel;

    class Game {
        constructor() {
            this.users = [];
            this.players = [];
            this.gameMaster = null;

            this.turnIndex = 0; // 0-index

            this.colors = [];
            this.panels = []; // 2D
            this.row = 0; // パネルの行数
            this.column = 0; // パネルの列数

            this.currentColor = null;
            this.status = GameStatus.INITIALIZING;

            this.loser = null; // 敗者
        }

        addUser(user) {
            this.users.push(user);
        }

        setGameMaster(user) {
            this.gameMaster = user;
        }

        createPanels(colors, row, column) {
            this.row = row;
            this.column = column;
            this.colors = colors;

            return this.panels = _.range(row).map(y => {
                return _.range(column).map(x => new Panel(_.sample(colors)) );
            });
        }

        gameStart() {
            this.status = GameStatus.TURN_GAME_MASTER;
        }

        // player == user (not game master)
        selectPanel(player) {

        }

        get currentPlayer() {
            return this.players[this.turnIndex % this.players.length];
        }
    }

    models.Game = Game;
}(alcoholicmine.models));