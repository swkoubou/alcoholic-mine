(function (models) {
    const Sound = models.Sound;

    class BgmController {
        constructor() {
            this.bgms = {};
            this.currentBgmName = null;
        }

        addBgm(name, url, params) {
            this.bgms[name]= new Sound(url, params);
            return this;
        }

        allPreload() {
            return Promise.all(_.map(this.bgms, sound => sound.fetchAudioBuffer()));
        }

        start(name) {
            if (this.currentBgm) {
                this.currentBgm.stop();
            }
            this.currentBgmName = name;
            this.currentBgm.start();
        }

        stop() {
            if (this.currentBgm) {
                this.currentBgm.stop();
            }
        }

        get currentBgm() {
            return this.bgms[this.currentBgmName];
        }
    }

    models.BgmController = BgmController;
}(alcoholicmine.models));