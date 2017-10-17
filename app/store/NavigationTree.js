Ext.define('WK.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
    fields: [{
        name: 'text'
    }],
    root: {
        expanded: true,
        children: [
            {
                text: 'Сотрудники',
                iconCls: 'x-fa fa-users',
                rowCls: 'nav-tree-badge',
                routeId: 'employees',
                leaf: true
            },
            {
                text: 'Настройки',
                iconCls: 'x-fa fa-list',
                rowCls: 'nav-tree-badge',
                expanded: true,
                selectable: false,
                children: [
                    {
                        text: 'Страница 1',
                        iconCls: 'x-fa fa-cogs',
                        routeId: 'page_1',
                        leaf: true
                    },{
                        text: 'Страница 2',
                        iconCls: 'x-fa fa-wrench',
                        routeId: 'page_2',
                        leaf: true
                    },{
                        text: 'Страница 3',
                        iconCls: 'x-fa fa-sliders',
                        routeId: 'page_3',
                        leaf: true
                    }
                ]

            }
        ]
    }
});
