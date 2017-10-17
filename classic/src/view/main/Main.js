Ext.define('WK.view.main.Main', {
    extend: 'Ext.container.Viewport',
    reference: 'mainMain',
    requires: [
        'WK.view.main.Controller',
        'WK.view.main.ViewModel',
        'WK.view.main.Header',
        'WK.view.main.MainContainer',
        'WK.view.main.Login',
        'WK.view.main.Errore404',
        'WK.store.NavigationTree',
        'Ext.list.Tree'
    ],
    controller: 'main',
    viewModel: 'main',
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        render: 'onMainRender'
    }
});
