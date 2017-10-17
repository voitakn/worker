Ext.define("WK.view.main.Login",{
    extend: 'Ext.container.Container',
    xtype: 'mainLogin',
    reference: 'mainLogin',
    requires: [
        'Ext.form.Panel'
    ],
    flex: 1,
    layout: 'center',
    items: {
        xtype: 'form',
        bodyPadding: 10,
        title: 'WK авторизация',
        reference: 'mainLoginForm',
        items: [{
            xtype: 'textfield',
            name: 'email',
            vtype: 'email',
            fieldLabel: 'Email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'passwd',
            inputType: 'password',
            fieldLabel: 'Пароль',
            allowBlank: false,
            minLength: 6
        }],
        buttons: [{
            text: 'Войти',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});
