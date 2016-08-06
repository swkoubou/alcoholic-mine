(function (routes, models, viewmodels, $$) {
    routes.Result = (f7App, mainView, bgmController) => {
        return (page) => {
            bgmController.start('result');
        };
    };

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
