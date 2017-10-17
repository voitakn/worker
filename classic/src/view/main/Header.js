Ext.define('WK.view.main.Header', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'mainHeader',
    cls: 'sencha-dash-dash-headerbar shadow',
    height: 64,
    itemId: 'headerBar',
    items: [
        {
            xtype: 'component',
            reference: 'senchaLogo',
            cls: 'sencha-logo',
            html: '<div class="main-logo"><span class="x-fa fa-users"></span>Workers</div>',
            width: 250
        },
        {
            margin: '0 0 0 8',
            ui: 'header',
            iconCls:'x-fa fa-navicon x-btn-icon-20',
            id: 'main-navigation-btn',
            handler: 'onToggleNavigationSize'
        },
        '->',
        {
            iconCls:'x-fa fa-th-large x-btn-icon-20',
            ui: 'header',
            href: '#profile',
            hrefTarget: '_self',
            tooltip: 'Профиль пользователя'
        },
        {
            xtype: 'tbtext',
            bind: {
                text: '{user.username}'
            },
            cls: 'top-user-name'
        },
        {
            iconCls: 'x-fa fa-sign-out x-btn-icon-20',
            ui: 'header',
            href: '#logout',
            hrefTarget: '_self',
            tooltip: 'Выйти из системы'
        }
    ]
});