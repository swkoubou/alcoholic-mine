(function (routes, models, viewmodels, data, $$) {
    routes.Settings = (f7App, mainView, bgmController, seController) => {
        return (page) => {
            $$(page.container).find('.submit-button').on('click', () => {
                data.settings = f7App.formToJSON('#settings-form');
                mainView.router.back();
            });
        };
    };

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, alcoholicmine.data, Dom7));
