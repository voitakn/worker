Ext.define('WK.model.Employer', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'guid'},
        {name: 'age', type: 'int'},
        {name: 'name', type: 'auto'},
        {name: 'email'},
        {
            name: "first",
            type: "auto",
            calculate: function (rec) {
                return rec.name.first
            }
        }, {
            name: "last",
            type: "auto",
            calculate: function (rec) {
                return rec.name.last
            }
        }, {
            name: "signature",
            type: "auto",
            calculate: function (rec) {
                var sign = '';
                if(rec.name.first) {
                    sign += rec.name.first[0]+'.'
                }
                if(rec.name.last) {
                    sign += rec.name.last[0]+'. - '
                }
                sign += rec.email;
                return sign;
            }
        }
    ],
    idProperty: 'guid'
});

Ext.define('WK.view.employees.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employees',
    data: {
        frecord: null,
        form: null
    },
    stores: {
        employees: {
            extend: 'Ext.data.Store',
            model: 'WK.model.Employer'
        }
    }
});
