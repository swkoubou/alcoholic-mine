(function () {
    window.localStorage = localStorage || {getItem: _.noop, setItem: _.noop};

    window.alcoholicmine = {
        models: {},
        modules: {},
        viewmodels: {},
        routes: {},
        data: {
            settings: _.defaults(JSON.parse(localStorage.getItem('userSettings') || '{}'), {
                users: 'john,beer-man,taro',
                panelRow: 3,
                panelColumn: 4,
                colorNumber: 3,
                memorizeDuration: 3000
            }),
            defaultColors: [
                ['red', '#f44336'],
                ['blue', '#2196f3'],
                ['green', '#4caf50'],
                ['brown', '#795548'],
                ['purple', '#9c27b0']
            ]
        }
    }
}());