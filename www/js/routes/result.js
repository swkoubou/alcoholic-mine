(function (routes, models, viewmodels, $$) {
    routes.Result = (f7App, mainView, bgmController, seController) => {
        return (page) => {
            bgmController.start('result');
            $$('.back-title-link').addClass('visible');
        };
    };

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
