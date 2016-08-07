(function (models) {
    const Sound = models.Sound;

    class SoundController {
        constructor() {
            this.sounds = {};
            this.currentSoundName = null;
        }

        add(name, url, params) {
            this.sounds[name]= new Sound(url, params);
            return this;
        }

        allPreload() {
            return Promise.all(_.map(this.sounds, sound => sound.fetchAudioBuffer()));
        }

        start(name) {
            if (this.currentSound) {
                this.currentSound.stop();
            }
            this.currentSoundName = name;
            this.currentSound.start();
        }

        stop() {
            if (this.currentSound) {
                this.currentSound.stop();
            }
        }

        get currentSound() {
            return this.sounds[this.currentSoundName];
        }
    }

    models.SoundController = SoundController;
}(alcoholicmine.models));