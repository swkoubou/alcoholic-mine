(function (AudioContext) {
    const _context = new AudioContext();

    class Sound {
        constructor(url, {loop=false}={}) {
            this.url = url;
            this.source = null;
            this.buffer = null;
            this.context = null;
            this.loop = loop;
        }

        fetchAudioBuffer() {
            this.context = _context;

            return new Promise((resolve, reject) => {
                const req = new XMLHttpRequest();
                req.responseType = 'arraybuffer';
                req.onreadystatechange = () => {
                    if (req.readyState === 4) {
                        if (req.status === 0 || req.status === 200) {
                            this.context.decodeAudioData(req.response, buf => {
                                this.buffer = buf;
                                resolve(this);
                            });
                        } else {
                            reject(req);
                        }
                    }
                };
                req.open('GET', this.url, true);
                req.send('');
            });
        }

        start() {
            this.source = this.context.createBufferSource();
            if (this.loop) { this.source.loop = true; }
            this.source.buffer = this.buffer;
            this.source.connect(this.context.destination);
            this.source.start(0);
        }

        stop() {
            this.source.stop();
        }
    }

    alcoholicmine.models.Sound = Sound;
}(window.AudioContext || window.webkitAudioContext));