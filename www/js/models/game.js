(function (models) {
    const GameStatus = models.GameStatus;
    const Panel = models.Panel;

    class Game {
        constructor({memorizeDuration=10000}={}) {
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

            this.memorizeDuration = memorizeDuration;

            this.loser = null; // 敗者

            this.lastSelectPanel = null;
        }

        addUser(user) {
            this.users.push(user);
        }

        setGameMaster(user) {
            this.gameMaster = user;
            this.players = this.users.filter(x => x !== user);
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
            if (this.status !== GameStatus.INITIALIZING) {
                throw new Error('game was started');
            } else {
                this.status = GameStatus.TURN_GAME_MASTER;
                this.turnIndex = 0;
                this.panels.forEach(xs => xs.forEach(x => x.isActive = true));
            }
        }

        selectColor(color) {
            if (this.status !== GameStatus.TURN_GAME_MASTER) {
                throw new Error(`status is not "TURN_GAME_MASTER", current status is ${this.status}`);
            }

            this.lastSelectPanel = null;

            // 色が残ってるか
            if (this._checkRemainedColor(color)) {
                this.currentColor = color;
                this.status = GameStatus.TURN_PLAYER;
                return true;
            } else {
                this.status = GameStatus.LOSE_GAME_MASTER;
                this.loser = this.gameMaster;
                return false;
            }
        }

        selectPanel(panel) {
            if (this.status !== GameStatus.TURN_PLAYER) {
                throw new Error(`status is not "TURN_PLAYER", current status is ${this.status}`);
            }

            // 無効なパネル
            if (!panel.isActive) {
                throw new Error('select panel is not active');
            }

            panel.isActive = false;
            this.lastSelectPanel = panel;

            // 正解パネルか
            if (panel.color === this.currentColor) {
                this.turnIndex += 1;
                if (this.turnIndex < this.maxTurn) {
                    this.status = GameStatus.TURN_GAME_MASTER;
                    this.loser = this.gameMaster;
                } else {
                    this.status = GameStatus.LOSE_GAME_MASTER;
                }
                return true;
            } else {
                this.status = GameStatus.LOSE_PLAYER;
                this.loser = this.currentPlayer;
                return false;
            }
        }

        fillPanelActive(status){
            this.panels.forEach(xs =>{
                xs.forEach(x =>{
                    x.isActive = status;
                });
            });
        }

        // 指定した色のパネルが残っているか
        _checkRemainedColor(color) {
            return this.panels.some(xs => {
                return xs.some(panel => panel.color === color);
            })
        }

        get currentPlayer() {
            return this.players[this.turnIndex % this.players.length];
        }

        get maxTurn() {
            return this.row * this.column;
        }

        get loseGameMaster () {
            return this.status === models.GameStatus.LOSE_GAME_MASTER;
        }

        get losePlayer () {
            return this.status === models.GameStatus.LOSE_PLAYER;
        }
    }

    models.Game = Game;
}(alcoholicmine.models));
