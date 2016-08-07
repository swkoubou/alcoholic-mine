(function (routes, models, viewmodels, $$) {
    routes.Result = (f7App, mainView, bgmController, seController) => {
        return (page) => {
            const game = page.query.game;
            const gameViewModel = page.query.gameViewModel;

            bgmController.start('result');
            $$('.back-title-link').addClass('visible');
            $$('.last-result-link').on('click', () => {
                gameViewModel.showLastResultPopup();
            });
        };
    };

}(alcoholicmine.routes, alcoholicmine.models, alcoholicmine.viewmodels, Dom7));
