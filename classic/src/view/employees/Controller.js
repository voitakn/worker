/**
 * Created by voitakn on 17.10.17.
 */
Ext.define('WK.view.employees.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employees',
    requires: [
        'WK.model.Employer'
    ],
    onIndexRender: function() {
        var me = this;
        if(!window.db) {
            Ext.Ajax.request({
                scope: me,
                url: '/json/mates.json',
                success: me.resultLoadMates
            });
        }
        else {
            me.setEmployerStore();
        }
    },
    resultLoadMates: function(resp) {
        var me = this,
        text = resp.responseText,
        res = Ext.JSON.decode(text);
        console.log(resp);
        window.db = res;
        me.setEmployerStore();
    },
    setEmployerStore: function() {
        console.log(window.db);
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('employees');
        store.loadData(window.db);
    },
    addItem: function() {
        var me = this,
            vm = me.getViewModel();
        vm.set('frecord', null);
        vm.set('guid', null);
        me.showForm();
    },

    editItem: function(grid, rowIndex, colIndex) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('employees');
        me.showForm();
        var rec = store.getAt(rowIndex);
        vm.set('frecord', rec);
        vm.set('guid', rec.get('guid'));
        rec.beginEdit();
    },

    showForm: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            form = vm.get('form');
        console.log('showForm', form);
        if(!form) {
            form = view.add({
                xtype: 'employeesForm'
            });
            vm.set('form', form);
        } else {
            console.log('isVisible', form.isVisible());
            form.close();
        }
        form.show();
    },

    saveItem: function() {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('employees'),
            frecord = vm.get('frecord'),
            form = vm.get('form');
        if(frecord.isModel) {
            var name = frecord.get('name'), newName = {};
            newName.first = frecord.name.first || name.first;
            newName.last = frecord.name.last || name.last;
            frecord.set('name', newName);
            frecord.endEdit();
            frecord.commit();
        } else { //commitChanges
            frecord.guid = me.genGuid();
            var newItem = Ext.create('WK.model.Employer', frecord);
            store.add(newItem);
        }
        if(form) {
            form.close();
        }
    },
    genGuid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    deleteItem: function(grid, rowIndex, colIndex) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('employees');
        var rec = store.getAt(rowIndex);
        Ext.Msg.show({
            title: 'Удаление сотрудника',
            message: 'Вы действительно хотите удалить сотрудника  - '+ rec.get('first') +' '+ rec.get('last') +'?',
            buttons: Ext.Msg.YESNO,
            icon:  Ext.Msg.WARNING,
            fn: function(btn) {
                if (btn === 'yes') {
                    store.remove(rec);
                }
            }
        });
    },

    onFormClose: function(form, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            frecord = vm.get('frecord');
        if(frecord) {
            if(frecord.isModel) {
                frecord.cancelEdit();
            }
        }
        vm.set('frecord', null);
        vm.set('guid', null);
    }
});