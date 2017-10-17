Ext.define('WK.Application', {
    extend: 'Ext.app.Application',
    name: 'WK',
    defaultToken : 'employees',
    stores: [
        'NavigationTree'
    ],
    lastHash: null,
    mainView: 'WK.view.main.Main'
});