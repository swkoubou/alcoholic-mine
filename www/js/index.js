(function (models, viewmodels, routes, $$) {

    const app = {
        initialize: function () {  document.addEventListener('deviceready', this.onDeviceReady, false); },
        onDeviceReady: () => { appInit(); }
    };

    if (typeof cordova === "undefined") {
        app.onDeviceReady();
    } else {
        app.initialize();
    }

    function appInit() {
        const f7App = new Framework7({
            material: true,
            template7Pages: true,
            precompileTemplates: true
        });
        const mainView = f7App.addView('.view-main', {});

        $$('.back-title-link').on('click', () => {
            mainView.router.load({url: 'index.html'});
            f7App.closeModal();
        });

        registerTemplateHelper();

        const bgmController = new models.SoundController();
        bgmController
            .add('main', 'sound/bgm/main.wav', {loop: true})
            .add('result', 'sound/bgm/result.mp3', {loop: true})
            .add('memorize', 'sound/bgm/thinking.wav', {loop: true});

        const seController = new models.SoundController();
        seController
            .add('selectColor', 'sound/se/color.wav', {loop: false})
            .add('correct', 'sound/se/correct.wav', {loop: false})
            .add('incorrect', 'sound/se/incorrect.wav', {loop: false})
            .add('gameStart', 'sound/se/gamestart.mp3', {loop: false})
            .add('turnStart', 'sound/se/turnstart.wav', {loop: false});

        f7App.onPageInit('index', routes.Index(f7App, mainView, bgmController, seController));
        f7App.onPageInit('game', routes.Game(f7App, mainView, bgmController, seController));
        f7App.onPageInit('result', routes.Result(f7App, mainView, bgmController, seController));
        f7App.onPageInit('config', routes.Settings(f7App, mainView, bgmController, seController));

        Promise.all([
            bgmController.allPreload(),
            seController.allPreload()
        ]).then(() => {
            routes.Index(f7App, mainView, bgmController, seController)(mainView);
        }).catch(e => console.error(e && (e.stack || e)));
    }

    function registerTemplateHelper() {
        Template7.registerHelper('ifeq', function (a, b, opts) {
            a === b ? opts.fn(this, opts.data) : opts.inverse(this, opts.data);
        })
    }

    app.initialize();
}(alcoholicmine.models, alcoholicmine.viewmodels, alcoholicmine.routes, Dom7));
