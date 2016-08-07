(function (routes, models, viewmodels, data, $$) {
    routes.Settings = (f7App, mainView, bgmController, seController) => {
        return (page) => {
            $$('.back-title-link').addClass('visible');

            $$(page.container).find('.submit-button').on('click', () => {
                const settings = f7App.formToJSON('#settings-form');

                if (validateSettings(settings)) {
                    data.settings = settings;
                    mainView.router.back();
                } else {
                    f7App.alert('適切な値を入力してください。', '値が間違っています。');
                }
            });
        };
    };

    function validateSettings(settings) {
        if (settings.users.split(',').length < 2) return false;
        if (!_.inRange(settings.panelRow, 1, 6)) return false;
        if (!_.inRange(settings.panelColumn, 1, 6)) return false;
        if (!_.inRange(settings.colorNumber, 1, 6)) return false;
        if (!_.inRange(settings.memorizeDuration, 500, 20001)) return false;
        return true;
    }

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, alcoholicmine.data, Dom7));
