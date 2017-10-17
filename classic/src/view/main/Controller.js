Ext.define('WK.view.main.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    requires: [
        'Ext.History',
        'Ext.util.Cookies'
    ],
    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },
    routes: {
        ':node': 'onRouteChange'
    },
    onRouteChange:function(id){
        var me = this,
            app = WK.getApplication();
        if(id != 'login' && id != 'logout') {
            if(id != app.lastHash) {
                app.lastHash = id;
                me.checkAuth();
            }
        } else {
            me.renderLogin();
        }
    },
    onMainRender: function() {
        var me = this,
            app = WK.getApplication(),
            hash = Ext.History.getHash();
        if(hash) {
            app.lastHash = hash;
        }
        me.checkAuth();
    },
    checkAuth: function() {
        var me = this,
            auth = Ext.util.Cookies.get('auth');
        if(!auth || auth == 0) {
            me.redirectTo("login");
        }
        else {
            me.renderModule();
        }
    },
    renderModule: function() {
        var me = this,
            app = WK.getApplication();
        me.renderMain();
        var refs = me.getReferences();
        if(refs.contentPanel) {
            refs.contentPanel.removeAll();
            var hash = Ext.History.getHash();
            var hsplit_slash = hash.split('/'),
                hsplit = hsplit_slash[0].split('?'),
                module = hsplit[0];

            var navigationList = refs.navigationTreeList,
                store = navigationList.getStore(),
                node = store.findNode('routeId', module);
            navigationList.setSelection(node);

            var moduleObj = Ext.create('WK.view.main.Errore404');
            if (module) {
                var mclass = 'WK.view.' + module + '.Index';
                console.log('renderModule', mclass);
                try {
                    moduleObj = Ext.create(mclass);
                }
                catch (e) {
                    console.log('ERROR', e);
                }
            }
            refs.contentPanel.add(moduleObj);
        }
    },
    renderMain: function() {
        var me = this,
            view = me.getView(),
            refs = me.getReferences();
        if(!refs || !refs.contentPanel) {
            view.removeAll();
            view.add({xtype: 'mainHeader'});
            view.add({xtype: 'mainContainer'});
        }
    },
    onNavigationTreeSelect: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));
        if (to) {
            this.redirectTo(to);
        }
    },
    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainer,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();
            refs.senchaLogo.setWidth(new_width);
            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);
            Ext.resumeLayouts();
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                navigationList.setMicro(false);
            }
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },
    renderLogin: function(){
        var me = this,
            view = me.getView(),
            app = WK.getApplication();
        view.removeAll();
        Ext.util.Cookies.set("auth", 0);
        app.lastHash = null;
        view.add({xtype: 'mainLogin'});
    },
    onLoginClick: function(button){
        var me = this,
            form = button.up('form'),
            values = form.getValues(),
            app = WK.getApplication();
        if(app.user.email == values.email && app.user.passwd == values.passwd){
            Ext.util.Cookies.set("auth", 1);
            me.redirectTo(app.getDefaultToken());
        }
    }
});