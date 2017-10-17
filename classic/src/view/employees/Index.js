Ext.define('WK.view.employees.Index', {
    extend: "Ext.panel.Panel",
    reference: 'employees_index',
    requires: [
        'WK.view.employees.Controller',
        'WK.view.employees.ViewModel'
    ],
    controller: 'employees',
    viewModel: 'employees',
    margin: 20,
    layout: 'fit',
    flex: 1,
    items: [{
        xtype: 'grid',
        title: 'Список сотрудников',
        bind: {store: '{employees}'},
        columns: [
            {
                text: 'Avatar',
                width: 100,
                renderer: function() {
                    return '<img style="height: 34px" src="/resources/images/User.png"/>'
                }
            },{
                dataIndex: 'first',
                text: 'First name',
                flex: 1,
                minWidth: 200
            },{
                dataIndex: 'last',
                text: 'Last name',
                flex: 1,
                minWidth: 200
            },{
                dataIndex: 'signature',
                text: 'Signature',
                flex: 1,
                minWidth: 250
            },{
                dataIndex: 'age',
                text: 'Age',
                width: 80
            },{
                xtype: 'actioncolumn',
                width: 80,
                menuDisabled: true,
                sortable: false,
                items: [{
                    iconCls: 'x-fa fa-pencil green',
                    handler: 'editItem'
                }, {
                    iconCls: 'x-fa fa-trash red',
                    handler: 'deleteItem'
                }]
            }
        ]
    }],
    tbar: {
        items: [
            {
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                html: '<b>Создать</b>',
                handler: 'addItem'
            }
        ]
    },
    listeners: {
        afterrender: 'onIndexRender'
    }
});

Ext.define('WK.view.employees.WindowForm', {
    extend: 'Ext.form.Panel',
    xtype: 'employeesForm',
    title: 'Форма сотрудника',
    width: 400,
    floating: true,
    closable: true,
    draggable: true,
    frame: true,
    closeAction: 'hide',
    buttonAlign : 'center',
    bodyPadding: 10,
    session: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email',
            vtype: 'email',
            allowBlank: false,
            bind: '{frecord.email}'
        },{
            xtype: 'textfield',
            fieldLabel: 'First name',
            name: 'first',
            allowBlank: false,
            bind: '{frecord.name.first}'
        },{
            xtype: 'textfield',
            fieldLabel: 'Last name',
            name: 'last',
            allowBlank: false,
            bind: '{frecord.name.last}'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Age',
            allowBlank: false,
            name: 'age',
            bind: '{frecord.age}'
        }
    ],
    buttons: [
        {
            text: 'Закрыть',
            handler: function(button, eOpts) {
                button.up('form').close();
            }
        },
        {
            text: 'Сохранить',
            formBind: true,
            disabled: true,
            handler: 'saveItem'
        }
    ],
    listeners: {
        close: 'onFormClose'
    }
});


