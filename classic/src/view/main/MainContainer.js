Ext.define('WK.view.main.MainContainer', {
    extend: 'Ext.container.Container',
    xtype: 'mainContainer',
    id: 'main-view-detail-wrap',
    reference: 'mainContainer',
    flex: 1,
    requires : [
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    layout: {
        type: 'hbox',
        align: 'stretchmax',
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },
    beforeLayout : function() {
        var me = this,
            height = Ext.Element.getViewportHeight() - 64,
            navTree = me.getComponent('navigationTreeList');
        me.minHeight = height;
        navTree.setStyle({
            'min-height': height + 'px'
        });
        me.callParent(arguments);
    },

    items: [
        {
            xtype: 'treelist',
            reference: 'navigationTreeList',
            itemId: 'navigationTreeList',
            ui: 'navigation',
            store: 'NavigationTree',
            width: 250,
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                selectionchange: 'onNavigationTreeSelect'
            }
        },
        {
            xtype: 'container',
            flex: 1,
            reference: 'contentPanel',
            itemId: 'contentPanel',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            height: 600
        }
    ]
});
